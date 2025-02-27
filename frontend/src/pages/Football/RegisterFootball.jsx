import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import emailjs from "@emailjs/browser";
import thunderboltsbup from "../../assets/logo/tdcwhitelogo.png";
import "./registerfootball.scss";

const RegisterFootball = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    contactNo: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    if (
      !formData.schoolName ||
      !formData.contactNo ||
      !formData.email ||
      !formData.type ||
      !formData.game ||
      !formData.category
    ) {
      setFormError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    // Sending the form data via EmailJS
    const templateParams = {
      schoolName: formData.schoolName,
      contactNo: formData.contactNo,
      email: formData.email,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        templateParams,
        "YOUR_USER_ID" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          setSuccessMessage("Registration successfully submitted!");
          setIsSubmitting(false);
        },
        (error) => {
          setFormError(
            "An error occurred while sending the form. Please try again."
          );
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="register-page">
      <Container>
        <div className="logo-text-thunder">
          <div className="logo-thunder">
            <img src={thunderboltsbup} alt="thunderbolts" />
          </div>
          <div className="text-thi">
            <h1>THUNDERBOLTS DEVELOPMENT CENTER</h1>
            <h2>Register Now</h2>
          </div>
        </div>
        <div className="from-regis">
          {formError && <Alert variant="danger">{formError}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form className="form-regise" onSubmit={handleSubmit}>
            <Row xs={1} md={2}>
              <Form.Group
                as={Col}
                controlId="formGridSchoolName"
                className="mb-3"
              >
                <Form.Label>School Name</Form.Label>
                <Form.Control
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group
                as={Col}
                controlId="formGridContactNo"
                className="mb-3"
              >
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="paynow-btn"
            >
              {isSubmitting ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Register Now"
              )}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default RegisterFootball;
