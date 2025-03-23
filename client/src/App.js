import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserInfo";
import WorkoutDetails from "./components/WorkoutDetails";
import AddWorkoutPage from "./components/AddWorkout";
import AddProgress from "./components/AddProgress";
import ProgressTracking from "./components/ProgressTracking";
import UserPage from "./pages/UserPage";
import Layout from "./pages/Layout"; // Import Layout
import UserRegister from "./pages/UserRegisterPage";
import EditUser from "./pages/EditUserPage";
import SignupPage from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassUserPage";

const App = () => {
  const [user2, setUser2] = useState(JSON.parse(localStorage.getItem("userDetails")));

  // Update user2 if localStorage changes
  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("userDetails"));
    setUser2(userFromStorage);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to dashboard if already logged in */}
        <Route path="/" element={ <LoginPage setUser2={setUser2} />} />

        {/* Protected Pages Wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={user2 ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/userprofile" element={user2 ? <UserProfile /> : <Navigate to="/" />} />
          <Route path="/workoutdetails" element={user2 ? <WorkoutDetails /> : <Navigate to="/" />} />
          <Route path="/addworkout" element={user2 ? <AddWorkoutPage /> : <Navigate to="/" />} />
          <Route path="/addprogress" element={user2 ? <AddProgress /> : <Navigate to="/" />} />
          <Route path="/progresstracking" element={user2 ? <ProgressTracking /> : <Navigate to="/" />} />
          <Route path="/users" element={user2 ? <UserPage /> : <Navigate to="/" />} />
          <Route path="/register" element={user2 ? <Navigate to="/dashboard" /> : <UserRegister />} />
          <Route path="/edit-user-role/:userid" element={user2 ? <EditUser /> : <Navigate to="/" />} />
        </Route>

        {/* Signup and Login Routes, visible for non-logged-in users */}
        <Route path="/signup" element={user2 ? <Navigate to="/dashboard" /> : <SignupPage />} />
        <Route path="/forgotpassword" element={user2 ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
        <Route path="/login" element={user2 ? <Navigate to="/dashboard" /> : <LoginPage setUser2={setUser2} />} />
        
        
        {/* Error and No-Access Pages */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
