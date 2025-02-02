import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./get.scss";

const GetInTouch = ({ mt }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // number: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/contacts/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Message sent successfully!");
      console.log(response.data);
      // Clear the form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="getintouvh" style={{ marginTop: mt }}>
        <Container>
          <h1>get in touch</h1>
          <p>
            Ready to take your skills to the next level? Join THUNDERBOLTS today
            and become part of our vibrant community. <br /> Sign up now to
            start your journey!
          </p>

          <div className="fon-getin-touch">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3 row-for" xs={1} md={4}>
                <Form.Group
                  as={Col}
                  controlId="formGridFirstName"
                  className="mb-3"
                >
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="mb-3"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* <Form.Group
                  as={Col}
                  controlId="formGridNumber"
                  className="mb-3"
                >
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                  />
                </Form.Group> */}
                <Col className="col-btn-gtom mb-3">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Spinner animation="border" size="lg" />
                    ) : (
                      "SEND"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default GetInTouch;
