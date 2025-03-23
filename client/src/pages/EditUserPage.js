import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../services/API";
import { alertWarning, alertSuccessLogin, alertSuccess } from "../alert";

const EditUser = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const api = new API();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    gender: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await api.get_user(userid);
      if (response) {
        setUserData(response);
      } else {
        alertWarning("User not found!");
        navigate("/"); // Redirect to homepage if user is not found
      }
    };
    fetchUserData();
  }, [userid, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
// console.log("edit user paegtebbsa");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = {
      ...userData,
    };

    const response = await api.update_user(userid, updatedData);
    if (response) {
      // Ensure you're passing the correct navigate function
      alertSuccess('User updated successfully!', navigate, "/users");
    }
  };

  return (
    <div className="basic" style={{ position: "relative", marginTop: "40px" }}>
      <Container style={{ width: "55%" }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender" value={userData.gender} onChange={handleChange} required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formHeight">
                <Form.Label>Height (cm)</Form.Label>
                <Form.Control
                  type="number"
                  name="height"
                  value={userData.height}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formWeight">
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  value={userData.weight}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="dark" type="submit" size="sm" style={{ backgroundColor: "#444749", borderColor: "#444749", marginTop: "15px" }}>
            Update Details
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default EditUser;
