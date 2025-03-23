import React, { useState } from "react";
import axios from "axios";
import "../css/Loginpage.css"
import { alertFinalSuccess, alertWarning } from "../alert";
import { API } from "../services/API";

const ForgotPassword = () => {
  const api = new API();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Password



  const handleEmailSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:5129/email/${email}`);
      if (!response.data) {
        alertWarning("User is not registered yet!");
        return;
      }
      setUserId(response.data.userId);
      const uname=response.data.fullName;

      

      // Generate 6-digit OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);

      const emailBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #2c3e50;">Hello ${uname},</h2>
        <p>This is a system-generated email for your OTP verification. Please use the following OTP to reset your password:</p>
        
        <div style="
          font-size: 20px; 
          font-weight: bold; 
          color: #fff; 
          background-color: #3498db; 
          padding: 15px; 
          border-radius: 5px; 
          text-align: center;
          display: inline-block;
        ">
          ${newOtp}
        </div>
        
        <p style="color: red; font-weight: bold;">Do not share this OTP with anyone. It is confidential.</p>

        <img src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZpdG5lc3MlMjB0cmFja2VyfGVufDB8fDB8fHww" alt="Security" style="width: 300px; margin-top: 20px; border-radius: 5px;"/>
        
        <p>Best Regards,</p>
        <p><strong>Your Security Team</strong></p>
      </div>
    `;


      // Send OTP via email
      await api.email_sender_function( email, "Password Reset OTP - Health fitness tracker", emailBody  );
      
      alertFinalSuccess("OTP sent to your email!");
      setStep(2); // Move to OTP step
    } catch (error) {
      console.error("Error checking email:", error);
      alertWarning("Error processing request");
    }
  };

  const handleOtpSubmit = () => {
    if (otp === generatedOtp) {
      setStep(3); // Move to Password reset step
    } else {
      alertWarning("Invalid OTP! Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      alertWarning("Passwords do not match!");
      return;
    }

    try {
      const userDetails = await axios.get(`http://localhost:5129/email/${email}`);
      
      // Update password & session key
      await axios.put(`http://localhost:5129/api/Users/${userId}`, {
        ...userDetails.data,
        passwordHash: password, // Assuming backend hashes it
        sessionKey: null, // Reset session key
      });

      alertFinalSuccess("Password updated successfully!");
      setStep(1); // Reset the form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOtp("");
    } catch (error) {
      console.error("Error updating password:", error);
      alertWarning("Error updating password");
    }
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-card">
    <div className="container mt-2">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Forgot Password</h2>

        {step === 1 && (
          <>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleEmailSubmit} style={{backgroundColor: '#444749', borderColor: '#444749' }}>
              Generate OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-3">
              <label className="form-label">Enter OTP:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-success w-100" onClick={handleOtpSubmit}>
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-3">
              <label className="form-label">New Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-danger w-100" onClick={handlePasswordReset}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
    </div>
    </div>
    </div>

  );
};

export default ForgotPassword;
