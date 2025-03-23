import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { alertFinalSuccess, alertSuccess, alertWarning } from "../alert"; // Assuming you have these alert functions in your project
// import email_sender_function from "../api/API.js"
import { API } from "../services/API";


const SignupPage = () => {
  const navigate = useNavigate();
  const api = new API();

  // States for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmPassword state
  const [otp, setOtp] = useState(""); // For OTP input
  const [generatedOtp, setGeneratedOtp] = useState(""); // For storing generated OTP
  const [step, setStep] = useState(1); // Step 1: User Info, Step 2: OTP, Step 3: Password
  const [loading, setLoading] = useState(false);

  // Handle sending OTP to the user's email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.get("http://localhost:5129/api/Users/emails");
      const existingEmails = response.data; // Assuming response.data contains an array of emails
  
      if (existingEmails.includes(email)) {
        // If the email is found in the list of existing emails, show a warning
        alertWarning("This email is already registered. Please use a different email.");
        return;
      }

    // Create user object for step 1
    const newUser = {
      fullName,
      email,
      gender,
      height: parseInt(height), // Ensure height is an integer
      weight: parseInt(weight), // Ensure weight is an integer
      sessionKey: null, // sessionKey is null
    };


      
      
      // Generate a random 6-digit OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);

      const emailBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #2c3e50;">Welcome to Health and Fitness Tracker Platform!</h2>
        <p>This is an automated email for OTP verification. Please use the OTP below to complete your account creation process:</p>
        
        <div style="
          font-size: 22px; 
          font-weight: bold; 
          color: #fff; 
          background-color: #27ae60; 
          padding: 15px; 
          border-radius: 5px; 
          text-align: center;
          display: inline-block;
        ">
          ${newOtp}
        </div>

        <p style="color: red; font-weight: bold;">Do not share this OTP with anyone. It is confidential.</p>

        <p>If you did not request this, please ignore this email.</p>

        <img src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZpdG5lc3MlMjB0cmFja2VyfGVufDB8fDB8fHww" alt="OTP Verification" style="width: 300px; margin-top: 20px; border-radius: 5px;"/>
        
        <p>Best Regards,</p>
        <p><strong>Your Support Team</strong></p>
      </div>
    `;

      await api.email_sender_function( email, "OTP for Signup - Health fitness tracker", emailBody  );
      alertFinalSuccess("OTP sent to your email!");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      console.error("Error sending OTP:", error);
      alertWarning("Error sending OTP. Please try again.");
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if (otp === generatedOtp) {
      setStep(3); // Move to password step
    } else {
      alertWarning("Invalid OTP! Please try again.");
    }
  };

  // Handle password and confirm password submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alertWarning("Passwords do not match! Please try again.");
      return;
    }

    // Create user object to send the final POST request
    const newUser = {
      fullName,
      email,
      gender,
      height: parseInt(height),
      weight: parseInt(weight),
      passwordHash: password, // Send password directly, assuming backend hashes it
      sessionKey: null, // Set sessionKey to null
    };

    try {
      setLoading(true);

      // Send POST request to create a new user
      const response = await axios.post("http://localhost:5129/api/Users", newUser);

      if (response.status === 201) {
        alertSuccess("Account created successfully! Please log in.", navigate, "/login");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        alertWarning(error.response.data.message || "An error occurred");
      } else {
        alertWarning("An error occurred while creating the account");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="overlay" style={{ width: "30%" }}>
        <div className="login-card">
          <h2 className="text-center mb-4">Signup</h2>

          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="fullName" style={{ display: "block", marginBottom: "5px" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="gender" style={{ display: "block", marginBottom: "5px" }}>
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="height" style={{ display: "block", marginBottom: "5px" }}>
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter your height"
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="weight" style={{ display: "block", marginBottom: "5px" }}>
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: "100%", padding: "10px", backgroundColor: "#444749", borderColor: "#444749", color: "white", borderRadius: "4px", cursor: "pointer" }}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="otp" style={{ display: "block", marginBottom: "5px" }}>
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP sent to your email"
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: "100%", padding: "10px", backgroundColor: "#444749", borderColor: "#444749", color: "white", borderRadius: "4px", cursor: "pointer" }}
                >
                  {loading ? "Verifying OTP..." : "Verify OTP"}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSignupSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "5px" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: "100%", padding: "10px", backgroundColor: "#444749", borderColor: "#444749", color: "white", borderRadius: "4px", cursor: "pointer" }}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
