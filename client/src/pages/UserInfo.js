import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FooterPage from "./Footer";
import "../css/Loginpage.css"

const UserProfile = () => {

  const user = JSON.parse(localStorage.getItem("userDetails"));

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
   
    <>
    <div className="container-fluid  userinfo">
        
<div className="container-fluid test" style={{paddingBottom:"75px"}}>

    <center>
    <div className="card usercard" 
    style={{ position:"fixed",left:"41%",width: "20rem", justifyContent:"center", alignItems:"center", marginTop:"100px" , height:"20rem"}}
    >
  <div className="card-body">
    <h5 className="card-title" style={{paddingTop:"30px"}}>User Details</h5>
    <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
           <p><strong>Height:</strong> {user.height} cm</p>
          <p><strong>Weight:</strong> {user.weight} kg</p>
    
  </div>
</div>
</center>
</div>


</div>
</>

  );
};

export default UserProfile;
