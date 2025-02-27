import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import "./RegistrationPage.scss";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    contactNo: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    schoolName: "",
    parentName: "",
    parentEmail: "",
    parentContactNo: "",
    parentAddress: "",
    sports: "",
    category: "",
    emergencyContactname: "",
    emergencyContactNumber: "",
    hasMedicalConditions: "",
    medicalDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();

      // Check if the birthday has passed this year
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }

      // Determine the category based on age
      let category = "";
      if (calculatedAge >= 6 && calculatedAge <= 11) {
        category = "Grassroots";
      } else if (calculatedAge >= 12 && calculatedAge <= 15) {
        category = "Intermediate";
      } else if (calculatedAge >= 16 && calculatedAge <= 19) {
        category = "Senior";
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        dob: value,
        age: calculatedAge.toString(),
        category, // Auto-set category
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.contactNo ||
      !formData.email ||
      !formData.age ||
      !formData.address ||
      !formData.dob ||
      !formData.age ||
      !formData.gender ||
      !formData.schoolName ||
      !formData.parentName ||
      !formData.parentEmail ||
      !formData.parentContactNo ||
      !formData.parentAddress ||
      !formData.sports ||
      !formData.category ||
      !formData.emergencyContactNumber ||
      !formData.emergencyContactname ||
      !formData.hasMedicalConditions
    ) {
      setFormError("Please fill in all required fields.");
      return false;
    }
    if (formData.hasMedicalConditions === "yes" && !formData.medicalDetails) {
      setFormError("Please provide medical details.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register_tdc",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form Data Submitted:", response.data);
      alert("Registration successful!"); // Show success message
      setFormData({
        fullName: "",
        address: "",
        contactNo: "",
        email: "",
        dob: "",
        age: "",
        gender: "",
        schoolName: "",
        parentName: "",
        parentEmail: "",
        parentContactNo: "",
        parentAddress: "",
        sports: "",
        category: "",
        emergencyContactname: "",
        emergencyContactNumber: "",
        hasMedicalConditions: "",
        medicalDetails: "",
      }); // Reset form
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      setError("Failed to submit the form. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="register-page">
      <Container>
        <div className="text-thi d-flex align-items-center flex-column jusify-content-center">
          <h1 className="headingTDC">THUNDERBOLTS DEVELOPMENT CENTER</h1>
          <p className="text-center pt-2 ">
            Thank you for choosing Thunderbolts Development Center (TDC) for
            your child’s sports development. <br /> Please fill out the form
            below to complete the registration process.
          </p>
        </div>

        <div className="from-regis">
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <Form className="form-regise" onSubmit={handleSubmit}>
              <h5 className="parallelogram-bg">Personal Information</h5>
              <Row xs={1} md={2}>
                <Form.Group
                  as={Col}
                  controlId="formGridfullName"
                  className="mb-3"
                >
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="formGridAddress"
                  className="mb-3"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className="form-input"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Row xs={1} md={3}>
                <Form.Group
                  as={Col}
                  controlId="formGridContactNo"
                  className="mb-3"
                >
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNo"
                    className="form-input"
                    placeholder="Enter contact number"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="formGridGender"
                  className="mb-3"
                >
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input text-secondary"
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row xs={1} md={3}>
                <Form.Group as={Col} controlId="formGridDob" className="mb-3">
                  <Form.Label>Date Of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    className="form-input text-secondary"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAge" className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    className="form-input"
                    value={formData.age}
                    readOnly
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridSchoolName"
                  className="mb-3"
                >
                  <Form.Label>School Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="schoolName"
                    className="form-input"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="Enter school name"
                    required
                  />
                </Form.Group>
              </Row>

              {/* parent info */}
              <h5 className="parallelogram-bg mt-4">
                Parent/Guardian Information
              </h5>

              <Row xs={1} md={2}>
                <Form.Group
                  as={Col}
                  controlId="formGridParentName"
                  className="mb-3"
                >
                  <Form.Label>Parent/Guardian Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentName"
                    className="form-input"
                    placeholder="Enter Parent name"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="formGridParentContactNo"
                  className="mb-3"
                >
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentContactNo"
                    className="form-input"
                    placeholder="Enter contact number"
                    value={formData.parentContactNo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Row xs={1} md={2}>
                <Form.Group
                  as={Col}
                  controlId="formGridParentAddress"
                  className="mb-3"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentAddress"
                    placeholder="Enter address"
                    className="form-input"
                    value={formData.parentAddress}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridParentEmail"
                  className="mb-3"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="parentEmail"
                    placeholder="Enter Email address"
                    className="form-input"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>

              <h5 className="parallelogram-bg mt-4">Sports Selection</h5>
              <Row xs={1} md={2}>
                <Form.Group
                  as={Col}
                  controlId="formGridSports"
                  className="mb-3"
                >
                  <Form.Label>Sports</Form.Label>
                  <Form.Select
                    name="sports"
                    value={formData.sports}
                    onChange={handleChange}
                    className="form-input text-secondary"
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="football">Football</option>
                    <option value="futsal">Futsal</option>
                    <option value="cricket">Cricket</option>
                    <option value="swimming">Swimming</option>
                    <option value="tennis">Tennis</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridCategory"
                  className="mb-3"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    className="form-input"
                    value={formData.category}
                    readOnly
                  />
                </Form.Group>
              </Row>

              <h5 className="mt-4 parallelogram-bg">Medical Information</h5>
              <Row xs={1} md={2}>
                {/* Medical Conditions or Allergies */}
                <Form.Group
                  as={Col}
                  controlId="formGridMedicalConditions"
                  className="mb-3"
                >
                  <Form.Label>
                    Does your child have any medical conditions or allergies?
                  </Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="hasMedicalConditions"
                      value="yes"
                      onChange={handleChange}
                      className="custom-radio"
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="hasMedicalConditions"
                      value="no"
                      onChange={handleChange}
                      inline
                      className="custom-radio"
                    />
                  </div>
                  {formData.hasMedicalConditions === "yes" && (
                    <Form.Control
                      type="text"
                      name="medicalDetails"
                      className="form-input mt-2"
                      value={formData.medicalDetails}
                      onChange={handleChange}
                      placeholder="Please specify"
                      required
                    />
                  )}
                </Form.Group>
              </Row>

              <Row xs={1} md={2}>
                {/* Emergency Contact Name */}
                <Form.Group
                  as={Col}
                  controlId="formGridEmergencyContactName"
                  className="mb-3"
                >
                  <Form.Label>Emergency Contact Person Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="emergencyContactname"
                    className="form-input"
                    value={formData.emergencyContactname}
                    onChange={handleChange}
                    placeholder="Enter emergency contact name"
                    required
                  />
                </Form.Group>

                {/* Emergency Contact Number */}
                <Form.Group
                  as={Col}
                  controlId="formGridEmergencyContactNumber"
                  className="mb-3"
                >
                  <Form.Label>Emergency Contact Person Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="emergencyContactNumber"
                    className="form-input"
                    value={formData.emergencyContactNumber}
                    onChange={handleChange}
                    placeholder="Enter emergency contact number"
                    required
                  />
                </Form.Group>
              </Row>

              {formError && <Alert variant="danger">{formError}</Alert>}
              <div className="button-container mt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="paynow-btn"
                >
                  {isSubmitting ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Register Here"
                  )}
                </Button>
              </div>

              <Row>
                <p className="text-dark">
                  Note : Keep me updated on new features, program updates, and
                  special offers from Thunderbolts Development Center.
                </p>
              </Row>
            </Form>
          )}
        </div>
      </Container>
    </div>
  );
};

export default RegistrationPage;
