import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { API } from "../services/API";
import { alertFinalSuccess } from "../alert";

const DashboardPage = () => {
  const api = new API();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [userWorkouts, setUserWorkouts] = useState([]);

  // Check if the logged-in user is an admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user && user.userId === 1) {
      setIsAdmin(true);
    }
  }, []);

  // Fetch all users if admin
  useEffect(() => {
    if (isAdmin) {
      const fetchUsers = async () => {
        try {
          const response = await fetch("http://localhost:5129/api/Users");
          const data = await response.json();
          const filteredUsers = data.filter(user => user.fullName !== 'admin');
          setUsers(filteredUsers);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [isAdmin]);

    // Fetch the report and send email for a specific user
  const handleSendMail = async (userId, userEmail,userFullName) => {
    try {
      // Fetch the report data for the last 7 days for the selected user
      const response = await fetch(`http://localhost:5129/api/ProgressTrackings/update/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch report data");
      }

      const reportData = await response.json();
      // const reportBody = `Your report for the last 7 days: ${JSON.stringify(reportData)}`;
      const reportBody = `
            <p>Hello ${userFullName},</p>
            <p>This is a generated mail for your last 7 days report.</p>
            <p>Here is your progress data:</p>
            <pre>${JSON.stringify(reportData, null, 2)}</pre>
            <p>Keep up the great work!</p>
            <img src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZpdG5lc3MlMjB0cmFja2VyfGVufDB8fDB8fHww" alt="Health Tracker" width="400"/>
            <p>Best Regards,</p>
            <p>Your Fitness Tracker Team</p>
        `;
      
      const emailResponse = await api.email_sender_function( userEmail, "Last 7 days report - Health fitness tracker", reportBody  );
      alertFinalSuccess("Email sent successfully to " + userFullName);


      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }


      const emailData = await emailResponse.json();
      console.log("Email sent successfully:", emailData);
    } catch (error) {
      console.error("Error sending email:", error);
      // alert("Error sending email");
    }
  };

  // Fetch all workout types
  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      try {
        const response = await fetch("http://localhost:5129/api/UserWorkouts");
        const data = await response.json();
        const types = [...new Set(data.map(workout => workout.workOutType))]; // Extract unique workout types
        setWorkoutTypes(types);
      } catch (error) {
        console.error("Error fetching workout types:", error);
      }
    };
    fetchWorkoutTypes();
  }, []);

  // Fetch logged-in user's workouts
  useEffect(() => {
    const user2 = JSON.parse(localStorage.getItem("userDetails"));
    if (user2) {
      const fetchUserWorkouts = async () => {
        try {
          const response = await fetch(`http://localhost:5129/api/UserWorkouts/user/${user2.userId}`);
          const data = await response.json();
          setUserWorkouts(data.map(workout => workout.workOutType));
        } catch (error) {
          console.error("Error fetching user workouts:", error);
        }
      };
      fetchUserWorkouts();
    }
  }, []);

  return (
    <div className="container-fluid  dashboardcss">
        {/* <div className="overlayy"> */}
        <div className="login-card">
    <Container className="">
      <Row className="text-center ">
        <Col>
          <h2>Welcome to Your Dashboard</h2>
          <p>Track your progress and manage your workouts efficiently.</p>
        </Col>
      </Row>

      {isAdmin ? (
        // Admin Content
        loading ? (
          <Row className="text-center"><Col><p>Loading users...</p></Col></Row>
        ) : (
          <>
          <center>
            <h4>Generate Last 7 days Progress Report for Users</h4></center>
              
              <div className="container mt-4">
      <div className="row">
            {users.map(user => (
        <div className="col-md-4 mb-4" >
          <div className="card" style={{ width: "18rem" }}>
            {/* <img
              className="card-img-top"
              src="https://via.placeholder.com/150"
              alt="Card image cap"
            /> */}
            <div className="card-body">
              <h5 className="card-title">{user.fullName}</h5>
              <p className="card-text">
                Email: {user.email }
              </p>
              <Button variant="primary" href="#" style={{ backgroundColor: "#444749", borderColor: "#444749"}} onClick={() => handleSendMail(user.userId, user.email,user.fullName)}>
                Send mail
              </Button>
            </div>
          </div>
        </div>
      ))}
          </div>
          </div>
            
          </>
        )
      ) : (
        // Non-Admin Content
        <>
        <h3>Your Workouts</h3>

        <div className="container mt-4">
      <div className="row">
            {workoutTypes.map((type, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card" style={{ width: "18rem" }}>
            {/* <img
              className="card-img-top"
              src="https://via.placeholder.com/150"
              alt="Card image cap"
            /> */}
            <div className="card-body">
              <h5 className="card-title">{type}</h5>
              <p className="card-text">
                Status: {userWorkouts.includes(type) ? "✅ Completed" : "❌ Not Completed"}
              </p>
              {/* <Button variant="primary" href="#">
                Go somewhere
              </Button> */}
            </div>
          </div>
        </div>
      ))}
          </div>
          </div>
          </>

      )}
    </Container>
    </div>
    {/* </div> */}
    </div>

  );
};

export default DashboardPage;