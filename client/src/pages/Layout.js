import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { API } from "../services/API";
import { alertSuccessLogin, alertWarning } from "../alert";
import { NavDropdown } from "react-bootstrap";
import Footer from "./Footer";

const Layout = () => {
  const api = new API();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); 

  // Get user details from localStorage
  const [user2, setUser2] = useState(JSON.parse(localStorage.getItem("userDetails")));
  
  useEffect(() => {
    // Check if the user is not logged in, navigate to login page
    if (!user2) {
      navigate("/"); // Redirect to login if not logged in
    } else {
      setIsAdmin(user2?.username === "admin");
    }
  }, [user2, navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Make the API call to logout
      const response = await api.user_auth_logout(user2?.email); // Assuming user2 has the email
      if (response.status === 200) {
        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");

        // Reset user2 state
        setUser2(null);

        // Show a success alert and redirect to login
        alertSuccessLogin("Logout Successful", navigate, "/login");
      } else {
        alertWarning("Logout failed. Please try again.");
      }
    } catch (error) {
      alertWarning("An error occurred while logging out.");
    }
  };

  return user2 ? (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        className="navbar shadow-sm"
        style={{ backgroundColor: "#444749", padding: "10px 20px", position: "relative" }}
      >
        <Container fluid>
          <h4 className="appname" style={{ fontWeight: "600", color: "#fff", padding: "5px", marginRight: "4%" }}>
            <Link to="/dashboard" className="text-decoration-none" style={{ color: "#fff" }}>
              Health & Fitness Tracker
            </Link>
          </h4>
          &nbsp;
          <Nav className="me-auto" style={{ fontWeight: "bold" }}>
            <Nav.Link as={Link} to="/userprofile" style={{ color: "#fff", fontWeight: "600" }}>
              User Profile
            </Nav.Link>
            &nbsp;
            &nbsp;
            <Nav.Link as={Link} to="/workoutdetails" style={{ color: "#fff", fontWeight: "600" }}>
              Workout Details
            </Nav.Link>
            &nbsp;
            &nbsp;
            <Nav.Link as={Link} to="/addworkout" style={{ color: "#fff", fontWeight: "600" }}>
              Add Workout
            </Nav.Link>
            &nbsp;
            &nbsp;
            <Nav.Link as={Link} to="/addprogress" style={{ color: "#fff", fontWeight: "600" }}>
              Add Progress
            </Nav.Link>
            &nbsp;
            &nbsp;
            <Nav.Link as={Link} to="/progresstracking" style={{ color: "#fff", fontWeight: "600" }}>
              Progress Tracking
            </Nav.Link>
            &nbsp;
            &nbsp;
            {
              user2.fullName==="admin"?<Nav.Link as={Link} to="/users" style={{ color: "#fff", fontWeight: "600" }}>
              Users
            </Nav.Link>:<Nav.Link as={Link} to={`/edit-user-role/${user2.userId}`} style={{ color: "#fff", fontWeight: "600" }}>
              Edit User
            </Nav.Link>
            }
            
          </Nav>

          {/* User Profile Dropdown */}
          <div className="profile d-flex align-items-center">
            <img src="/assets/suser2.png" alt="User" style={{ width: "30px", height: "30px", marginLeft: "10px" }} />
            <NavDropdown id="profile-dropdown" align="end" className="custom-dropdown" style={{color:"white"}}>
              <NavDropdown.ItemText>
                <p className="mb-0" style={{ fontSize: "0.9rem", color: "#333" }}>
                  <strong>Email:</strong> {user2?.email}
                </p>
              </NavDropdown.ItemText>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} style={{ color: "#FF6B6B", fontWeight: "500" }}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Container>
      </Navbar>

      <div className="main-content" style={{ paddingBottom: "50px" }}>
        <Outlet />
      </div>

      <Footer /> {/* Add Footer here */}
    </>
  ) : null; // If user2 is null, do not render anything
};

export default Layout;
