import React, { useState } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    subscribe: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subscribe) {
      alert("Please agree to the declaration before submitting.");
      return;
    }
    setLoading(true);

    const templateParams = {
      admin_email: "info@thunderbolts.com.np",
      user_email: formData.email,
      firstName: formData.firstName,
      phone: formData.phone,
      lastName: formData.lastName,
      message: formData.message,
      subscribe: formData.subscribe ? "Yes" : "No",
    };

    try {
      await Promise.all([
        emailjs.send(
          "service_j7x6wsl",
          "template_8kyv05o",
          templateParams,
          "Bt6Nk68KMKEt_CjyH"
        ),
        emailjs.send(
          "service_j7x6wsl",
          "template_pvlvzu5",
          templateParams,
          "Bt6Nk68KMKEt_CjyH"
        ),
      ]);
      setTimeout(() => {
        toast.success("Contact  Form submitted successfully!", {
          position: "top-right",
        });
      }, 1000);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        subscribe: false,
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send email. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     try {
  //       const response = await axios.post("/api/contacts/", formData, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       toast.success("Message sent successfully!");
  //       console.log(response.data);
  //       // Clear the form
  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         phone: "",
  //         message: "",
  //         subscribe: false,
  //       });
  //     } catch (error) {
  //       toast.error("Failed to send message. Please try again.");
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <>
      <div className="contai-form">
        <Form onSubmit={handleSubmit}>
          <Row xs={1} md={2}>
            <Form.Group as={Col} controlId="formGridFirstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row xs={1} md={2}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email Address*</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Phone Number*</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          {/* Checkbox for subscription */}
          <Form.Group className="mb-3" controlId="formGridSubscribe">
            <Form.Check
              type="checkbox"
              label={
                <span
                  style={{
                    fontSize: "16px",
                    color: "#ffffff",
                    fontWeight: "400",
                  }}
                >
                  Note: Keep me updated on new features, program updates, and
                  special offers from
                  <span style={{ fontWeight: "600", color: "#FFD700" }}>
                    {" "}
                    Thunderbolts Development Center
                  </span>
                  .
                </span>
              }
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            />
          </Form.Group>

          <Button type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "SEND"}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ContactForm;
