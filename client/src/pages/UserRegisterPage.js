import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API } from "../services/API";
import { alertWarning } from "../alert";

const UserRegister = () => {
  const navigate = useNavigate();
  const api = new API();

  // State variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alertWarning("Password Mismatch!!!");
      return;
    }

    const data = {
      fullName,
      email,
      passwordHash: password, // Assuming backend handles hashing
      gender,
      height: parseInt(height),
      weight: parseInt(weight),
      createdAt: new Date().toISOString(),
      sessionKey:null
    };

    const response = await api.register_user(data, navigate);
    console.log(response);
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
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select value={gender} onChange={(e) => setGender(e.target.value)} required>
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
                  placeholder="Enter height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formWeight">
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button variant="link" onClick={() => setPasswordVisible(!passwordVisible)} style={{ position: "absolute", right: "5%", top: "39%" }}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button variant="link" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={{ position: "absolute", right: "5%", top: "39%" }}>
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="dark" type="submit" size="sm" style={{ backgroundColor: "#444749", borderColor: "#444749", marginTop: "15px" }}>
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UserRegister;
