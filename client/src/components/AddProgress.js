import React, { useState } from 'react';
import { alertSuccessLogin } from '../alert';
import { useNavigate } from 'react-router-dom';
import FooterPage from '../pages/Footer';
import "../css/Loginpage.css"

const AddProgress = () => {
  // State to hold form values
  const [weightKG, setWeightKG] = useState(300);
  const [bmi, setBmi] = useState(0);
  const [bodyFatPercentage, setBodyFatPercentage] = useState(50);
  const [checkingDate, setCheckingDate] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const user2 = JSON.parse(localStorage.getItem("userDetails"));
    const  userid=user2.userId;
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const progressData = {
      userid,
      weightKG,
      bmi,
      bodyFatPercentage,
      checkingDate,
    };

    try {
      const response = await fetch('http://localhost:5129/api/ProgressTrackings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit progress');
      }
        alertSuccessLogin('Progress added successfully!', navigate, "/progresstracking");
      // alert('Progress added successfully!');
      // Reset form or handle as needed after success
      setWeightKG(300);
      setBmi(0);
      setBodyFatPercentage(50);
      setCheckingDate(new Date().toISOString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container-fluid  addprogress">
        <div className="overlayy">
        <div className="login-card">
    <div className="container mt-2">
      <h2 className="mb-4">Add Progress</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="weightKG" className="form-label">Weight (KG):</label>
          <input
            id="weightKG"
            type="number"
            className="form-control"
            value={weightKG}
            onChange={(e) => setWeightKG(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bmi" className="form-label">BMI:</label>
          <input
            id="bmi"
            type="number"
            className="form-control"
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bodyFatPercentage" className="form-label">Body Fat Percentage:</label>
          <input
            id="bodyFatPercentage"
            type="number"
            className="form-control"
            value={bodyFatPercentage}
            onChange={(e) => setBodyFatPercentage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="checkingDate" className="form-label">Checking Date:</label>
          <input
            id="checkingDate"
            type="datetime-local"
            className="form-control"
            value={checkingDate.substring(0, 16)} // Limit to the first 16 characters for proper formatting
            onChange={(e) => setCheckingDate(e.target.value)}
            required
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ backgroundColor: "#444749", borderColor: "#444749"}}>
            {loading ? 'Submitting...' : 'Add Progress'}
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
      <FooterPage/>
      </>

  );
};

export default AddProgress;
