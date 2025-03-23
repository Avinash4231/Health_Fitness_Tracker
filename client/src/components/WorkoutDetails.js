import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component'; // Importing the DataTable component

const WorkoutDetails = () => {
  const [workoutDetails, setWorkoutDetails] = useState([]); // State to store workout details
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages

  const user2 = JSON.parse(localStorage.getItem("userDetails"));

  // Fetch workout details from the API when the component mounts
  useEffect(() => {
    fetch(`http://localhost:5129/api/UserWorkouts/user/${user2.userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setWorkoutDetails(data); // Set the fetched data in state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError(error.message); // Set error message if fetching fails
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array means this effect runs only once on mount

  const columns = [
    {
      name: 'WorkOut ID',
      selector: row => row.workOutId,
      sortable: true
    },
    {
      name: 'User ID',
      selector: row => row.userId,
      sortable: true
    },
    {
      name: 'Workout Type',
      selector: row => row.workOutType,
      sortable: true
    },
    {
      name: 'Duration (Minutes)',
      selector: row => row.durationMinutes,
      sortable: true
    },
    {
      name: 'Calories Burned',
      selector: row => row.caloriesBurned,
      sortable: true
    },
    {
      name: 'Workout Date',
      selector: row => new Date(row.workoutDate).toLocaleDateString(),
      sortable: true
    }
  ];

  if (loading) {
    return (
      <Container className="mt-5">
        <h2>Workout Details</h2>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <h2>Error</h2>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <center><h2>Workout Details</h2>
      <DataTable
        title="User Workouts"
        columns={columns}
        data={workoutDetails}
        pagination
        highlightOnHover
        responsive
        striped
        customStyles={{
          headCells: {
            style: { backgroundColor: "#444749", color: "#ffffff", fontSize: "15px", fontWeight: "bold" },
          },
          cells: { style: { border: "0.4px solid #e0e0e0" } },
          pagination: { style: { fontSize: "12px", padding: "10px", justifyContent: "flex-end" } },
        }}
      /></center>
    </Container>
  );
};

export default WorkoutDetails;
