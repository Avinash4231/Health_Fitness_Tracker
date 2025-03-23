import React, { useState } from "react";
import "../css/Loginpage.css";
import { useNavigate } from "react-router-dom";
import { alertSuccess, alertWarning } from "../alert";
import { API } from "../services/API";

const LoginPage = ({ setUser2 }) => {
  const api = new API();
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };

      const response = await api.user_auth_login(data);
      console.log(response);


      const { message, user, access } = response.data;
      // localStorage.setItem("userDetails", JSON.stringify(user)); // Save to localStorage


      if (message === 'You are logged in somewhere else. Please log out from other devices.') {
        alertWarning(message);
      } else {
        console.log(response.data);

        // Store JWT token, user details, and session key separately in localStorage
        setToken(access);
        localStorage.setItem('token', access); // Store JWT token
        localStorage.setItem("userDetails", JSON.stringify(user)); // Store user details
        setUser2(user); // Update state immediately
        alertSuccess('Login Successful', navigate, "/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alertWarning(error.response.data.message || 'An error occurred');
      } else {
        alertWarning('An error occurred');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-card">
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          <form>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleSubmit}
              disabled={loading}
        style={{ backgroundColor: '#444749', borderColor: '#444749' }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Don't have an account? Signup link */}
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "#007bff" }}
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>            
          </p>
          <p className="text-center mt-1">
  <a href="/forgotpassword" className="forgot-password-link">Forgot Password</a>
</p>



        </div>
      </div>
    </div>
  );
};

export default LoginPage;
