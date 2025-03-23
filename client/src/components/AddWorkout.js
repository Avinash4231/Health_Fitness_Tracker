import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import "../css/Loginpage.css"

const AddWorkoutPage = () => {
  // Form data state
  const [formData, setFormData] = useState({
    workOutType: '',
    durationMinutes: '',
    caloriesBurned: '',
    workoutDate: ''
  });

  // Success and error message state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const user2 = JSON.parse(localStorage.getItem("userDetails"));

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWorkout = {
      userId: user2.userId, // Assuming a static userId or could be dynamic based on authentication
      workOutType: formData.workOutType,
      durationMinutes: parseInt(formData.durationMinutes),
      caloriesBurned: parseInt(formData.caloriesBurned),
      workoutDate: formData.workoutDate
    };

    try {
      // Send POST request to create a new workout
      const response = await axios.post('http://localhost:5129/api/UserWorkouts', newWorkout);
      setSuccessMessage('Workout added successfully!');
      setErrorMessage('');
      // Clear the form
      setFormData({

        workOutType: '',
        durationMinutes: '',
        caloriesBurned: '',
        workoutDate: ''
      });
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Failed to add workout. Please try again.');
    }
  };

  

  return(
    <div className="container-fluid  addworkouts">
        <div className="overlay overlayy">
        <div className="login-card">
      <center><h2 style={{paddingBottom:"4px"}}>Add Workout</h2></center>
      <form onSubmit={handleSubmit}>
        <label style={{marginLeft:"7px"}}>Workout Type:</label>
      <div className="mb-3"> <input type="text"  className="form-control" name="workOutType" value={formData.workOutType} onChange={handleInputChange} placeholder="Enter workout type (e.g. Cardio, Strength)" required /></div>
      <label style={{marginLeft:"7px"}}>Duration (Minutes):</label>
      <div className="mb-3"> <input type="number"  className="form-control" name="durationMinutes" value={formData.trainerName} onChange={handleInputChange} placeholder="Enter workout duration in minutes" required /></div>
      <label style={{marginLeft:"7px"}}>Calories Burned : </label>
      <div className="mb-3"> <input type="number"   className="form-control" name="caloriesBurned" value={formData.caloriesBurned} onChange={handleInputChange} placeholder="Enter calories burned" required /></div>
      <label style={{marginLeft:"7px"}}>Workout Date:</label>
      <div className="mb-3"> <input type="datetime-local" name="workoutDate"  className="form-control" value={formData.workoutDate} onChange={handleInputChange} placeholder="Duration" required /></div>
      
<div className='row'>
    <div className='col-8'>
    <button type="submit" className="btn btn-secondary btn-block">Add Workout</button>
    </div>
    <div className='col'>
    {/* <button className="btn btn-secondary btn-block"  onClick={() => navigate("/")}>
                        Back
                    </button> */}
    </div>
</div>
        
      </form>

      {/* {message && <p className="message">{message}</p>} */}

     
      
    </div>
    </div>
    </div>



           
       
        
  )
};

export default AddWorkoutPage;
