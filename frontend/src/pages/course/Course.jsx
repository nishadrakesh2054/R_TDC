import {
  Container,
  Row,
  Col,

  Accordion,
  Card,
  Table,
 
} from "react-bootstrap";
import {
  FaCalendarAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRocket,
} from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import TDCLOGO from "../../assets/logo/tdc-logo.png";
// import emailjs from "@emailjs/browser";
import "./course.scss";
// import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

// import { toast } from "react-toastify";

const Course = () => {
  //   const [timeLeft, setTimeLeft] = useState("");
  //   useEffect(() => {
  //     const deadline = new Date("2025-02-25T00:00:00").getTime();

  //     const interval = setInterval(() => {
  //       const now = new Date().getTime();
  //       const distance = deadline - now;

  //       if (distance <= 0) {
  //         clearInterval(interval);
  //         setTimeLeft("EXPIRED");
  //       } else {
  //         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //         const hours = Math.floor(
  //           (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //         );
  //         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //         setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  //       }
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, []);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     dob: "",
//     gender: "",
//     address: "",
//     reason: "",
//     declaration: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.declaration) {
//       alert("Please agree to the declaration before submitting.");
//       return;
//     }

//     const templateParams = {
//       admin_email: "info@thunderbolts.com.np",
//       user_email: formData.email,
//       full_name: formData.fullName,
//       phone: formData.phone,
//       dob: formData.dob,
//       gender: formData.gender,
//       address: formData.address,
//       reason: formData.reason,
//     };

//     try {
//       await Promise.all([
//         emailjs.send(
//           "service_j7x6wsl",
//           "template_8kyv05o",
//           templateParams,
//           "Bt6Nk68KMKEt_CjyH"
//         ),
//         emailjs.send(
//           "service_j7x6wsl",
//           "template_pvlvzu5",
//           templateParams,
//           "Bt6Nk68KMKEt_CjyH"
//         ),
//       ]);
//       setTimeout(() => {
//         toast.success("Form submitted successfully!", {
//           position: "top-right",
//         });
//       }, 1000);

//       //   alert("Form submitted successfully! ");
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         dob: "",
//         gender: "",
//         address: "",
//         reason: "",
//         declaration: false,
//       });
//     } catch (error) {
//       console.error("EmailJS Error:", error);
//       toast.success("Failed to send email. Try again later.");
//     }
//   };

  return (
    <div className="football-course">
      <Container>
        {/* Hero Section */}
        <Row className="justify-content-center text-center mb-2 ">
          <Col md={12}>
            <h1 className="course-title">THUNDERBOLTS DEVELOPMENT CENTER</h1>
            <h4 className="course-subtitle">
              Football Workshop: Introduction to Coaching - 2025
            </h4>
          </Col>
        </Row>

        {/* Introduction */}
        <Row className="justify-content-start mb-2">
          <h5 className="text-start ">Kickstart Your Coaching Journey!</h5>
          <Col md={12} className="intro-box py-2">
            <p className="text-start px-2">
              Are you passionate about football and eager to take your first
              step into the world of coaching? <br /> <br />
              The Thunderbolts Development Center is excited to announce our
              Introduction to Coaching Workshop, designed for individuals aged
              18 to 36 who aspire to begin their coaching career. Whether you
              are a male or female with a love for the game, this program is
              your gateway to turning your passion into a profession.
            </p>
          </Col>
        </Row>

        {/* <Row className="py-4 ">
     <Row className="justify-content-center  p-0 m-0 ">
          <Col md={6} lg={4}>
            <Card className="shadow-lg rounded-lg border-0  p-0 m-0">
              <Card.Body className=" rounded-lg  ">
                <div>
                  <h3 className="text-center text-primary font-weight-bold">
                    REGISTER DEADLINE
                  </h3>
                  <p className="text-center text-muted fs-5 ">
                    25th February 2025
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center  p-0 m-0">
          <Col md={6} lg={4}>
            <div className="d-flex justify-content-center align-items-center  bg-warning py-4">
              <h5 className=" text-capitalize fw-bold  fs-3" style={{color:"#0240A8"}}>
                {timeLeft}
              </h5>
            </div>
          </Col>
        </Row>
     </Row> */}

        <Row className="justify-content-start mb-2 py-2">
          <h5 className="text-start ">Workshop Details</h5>
          {/* Eligibility Section */}
          <Col md={4} sm={12} className="mb-3">
            <Card className="details-box">
              <Card.Body>
                <Card.Title className="text-center text-primary fs-4">
                  Eligibility
                </Card.Title>
                <ul className="text-dark text-center">
                  <li>
                    <span className="fs-4 fw-bold ">18 to 36</span> <br />
                    <span className="fs-5 fw-semibold years "> years</span>
                    <br />
                    Open to males and females.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Duration Section */}
          <Col md={4} sm={12} className="mb-3">
            <Card className="details-box">
              <Card.Body>
                <Card.Title className="text-center text-primary fs-4">
                  Duration
                </Card.Title>
                <ul className="text-dark text-center">
                  <li>
                    <span className="fs-4 fw-bold"> 32 Hours</span> <br />
                    Of
                    <br />
                    comprehensive training.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* course fee Section */}
          <Col md={4} sm={12} className="mb-3">
            <Card className="details-box">
              <Card.Body>
                <Card.Title className="text-center text-primary fs-4">
                  Course Fee
                </Card.Title>
                <ul className="text-dark text-center">
                  <li>
                    <span className="fs-4 fw-bold">NPR 3,000 /- </span> <br />
                    <br />
                    <br />
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <div>
            <h5 className=" text-start">Schedule</h5>

            <div className="table-responsive">
              <Table bordered className="text-center">
                <thead>
                  <tr>
                    <th className="text-primary">Week 1</th>
                    <th className="text-primary">Week 2</th>
                    <th className="text-primary">Week 3</th>
                    <th className="text-primary">Week 4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-start ">
                    <td>
                      <FaCalendarAlt className="me-2 text-warning" /> Saturday,
                      1st March <br />
                      <FaCalendarAlt className="me-2 text-warning" /> Sunday,
                      2nd March <br />
                      <FaClock className="me-2 text-warning" /> 10:00 AM - 2:00
                      PM
                    </td>
                    <td>
                      <FaCalendarAlt className="me-2 text-warning" /> Saturday,
                      8th March <br />
                      <FaCalendarAlt className="me-2 text-warning" /> Sunday,
                      9th March <br />
                      <FaClock className="me-2 text-warning" /> 10:00 AM - 2:00
                      PM
                    </td>
                    <td>
                      <FaCalendarAlt className="me-2 text-warning" /> Saturday,
                      15th March <br />
                      <FaCalendarAlt className="me-2 text-warning" /> Sunday,
                      16th March <br />
                      <FaClock className="me-2 text-warning" /> 10:00 AM - 2:00
                      PM
                    </td>
                    <td>
                      <FaCalendarAlt className="me-2 text-warning" /> Saturday,
                      22nd March <br />
                      <FaCalendarAlt className="me-2 text-warning" /> Sunday,
                      23rd March <br />
                      <FaClock className="me-2 text-warning" /> 10:00 AM - 2:00
                      PM
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Row>

        <Row className="justify-content-start">
          <h5 className="text-start px-2"> Certification</h5>
          <Col md={12} className="why-box">
            <p className="text-start pt-3 px-4">
              Participants will receive a Certificate of Participation upon
              successful completion of the 32-hour workshop
            </p>
          </Col>
        </Row>

        {/* what you will gain */}
        <Row className="justify-content-start my-2">
          <Col md={12} className="why-box">
            <Accordion defaultActiveKey="0" className="my-2">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h5 className="text-start text-dark px-2 ">
                    {" "}
                    <FaRocket className="me-2 text-primary" />
                    What You’ll Gain
                  </h5>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="d-flex justify-content-start align-items-start flex-column ">
                    <li>
                      <MdKeyboardArrowRight />
                      Foundational knowledge of football coaching principles.
                    </li>
                    <li>
                      <MdKeyboardArrowRight />
                      Practical skills to plan and deliver effective training
                      sessions.
                    </li>
                    <li>
                      <MdKeyboardArrowRight />
                      Insights into player development and team management.
                    </li>
                    <li>
                      <MdKeyboardArrowRight />A pathway to pursue your personal
                      aspirations in coaching.
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
        {/* 
   

        {/* Why Join Thunderbolts? */}
        <Row className="justify-content-start my-2">
          <Col md={12} className="why-box">
            <Accordion defaultActiveKey="0" className="my-2">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h5 className="text-start text-dark px-2 ">
                    {" "}
                    <FaRocket className="me-2 text-primary" />
                    Why Join Thunderbolts?
                  </h5>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="d-flex justify-content-start align-items-start flex-column ">
                    <li className="text-center">
                      <MdKeyboardArrowRight />
                      At Thunderbolts Development Center, we are committed to
                      nurturing the next generation of Male and Female football
                      coaches. Our experienced instructors will guide you
                      through every step, ensuring you gain the confidence and
                      expertise to succeed in your coaching pathways in the
                      world of football coaching.
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        {/* Register  form start  section */}
        {/* <Row className=" intro-box py-2">
          <Col md={12} lg={12} className=" ">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h5 className="text-start text-dark px-2">⚽ Register Now</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <Form
                    onSubmit={handleSubmit}
                    className="shadow px-4 py-2 rounded"
                  >
                    <Row>
                      <Col md={6}>
                        <Form.Group
                          controlId="fullName"
                          className="text-start fw-semibold fs-6"
                        >
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group
                          controlId="email"
                          className="text-start fw-semibold fs-6"
                        >
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={6}>
                        <Form.Group
                          controlId="phone"
                          className="text-start fw-semibold fs-6"
                        >
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            pattern="[0-9]{10}"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter 10-digit phone number"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group
                          controlId="dob"
                          className="text-start fw-semibold fs-6"
                        >
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={6}>
                        <Form.Group
                          controlId="gender"
                          className="text-start fw-semibold fs-6"
                        >
                          <Form.Label>Gender</Form.Label>
                          <Form.Control
                            as="select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group
                          controlId="address"
                          className="text-start fw-semibold fs-6"
                        >
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={1}
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={12}>
                        <Form.Label className="text-start align-items-start d-flex fw-bold fs-6">
                          What is your primary reason for joining this
                          course/workshop?
                        </Form.Label>
                        <Form.Group
                          controlId="reason"
                          className="text-start  fs-6"
                        >
                          <div className="d-flex flex-column">
                            <Form.Check
                              type="radio"
                              label="To become a certified football coach"
                              name="reason"
                              value="To become a certified football coach"
                              onChange={handleChange}
                              checked={
                                formData.reason ===
                                "To become a certified football coach"
                              }
                            />
                            <Form.Check
                              type="radio"
                              label="To improve coaching skills"
                              name="reason"
                              value="To improve coaching skills"
                              onChange={handleChange}
                              checked={
                                formData.reason === "To improve coaching skills"
                              }
                            />
                            <Form.Check
                              type="radio"
                              label="To learn football tactics and strategies"
                              name="reason"
                              value="To learn football tactics and strategies"
                              onChange={handleChange}
                              checked={
                                formData.reason ===
                                "To learn football tactics and strategies"
                              }
                            />
                            <Form.Check
                              type="radio"
                              label="Other"
                              name="reason"
                              value="Other"
                              onChange={handleChange}
                              checked={formData.reason === "Other"}
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col md={12}>
                        <Form.Label className="text-start align-items-start d-flex fw-bold fs-6">
                          Declaration
                        </Form.Label>
                        <Form.Group
                          controlId="declaration"
                          className="text-start fs-6"
                        >
                          <Form.Check
                            type="checkbox"
                            label="I confirm that all the information provided is accurate and I agree to the terms and conditions."
                            name="declaration"
                            checked={formData.declaration}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col md={12} className="text-center">
                        <Button
                          variant="primary text-light"
                          type="submit"
                          className="px-5 py-1"
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row> */}
        {/* Register  form end  section */}

        <Row className=" my-4">
          <Col xs={12} md={12} lg={12}>
            {/* Register Section Title */}
            <div className="text-center mb-4">
              <p className="text-light fw-bold fs-6 px-4 pt-2 text-start">
                Spaces are limited, so don’t miss this opportunity to begin your
                coaching journey!
              </p>
            </div>

            {/* Contact Section */}
            <div className="px-4">
              <p className="fs-3 fw-bold text-light text-start mb-3">Contact</p>

              {/* Contact Information */}
              <div className="text-start fs-5">
                <p className="mb-2">
                  <FaPhoneAlt className="text-warning me-2" />
                  <span>+977 9801973975/73</span>
                </p>
                <p className="mb-2">
                  <FaMapMarkerAlt className="text-warning me-2" />
                  <span>Dhapakhel, Lalitpur.</span>
                </p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Closing Statement */}
        <Row>
          <Col md={12} className="closing-box py-4">
            <h5 className="text-center  fs-3 fst-italic px-2 py-2 text-warning">
              Take the First Step Toward Your Coaching Dreams!
            </h5>

            <p className=" lastp">
              Join us at the Thunderbolts Development Center and unlock your
              potential as a football coach. Let’s grow and shape the future of
              Nepalese football together!
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center text-center d-flex">
          <Col md={8}>
            <div className="d-flex justify-content-center mt-3">
              <img
                src={TDCLOGO}
                alt="TDC Logo"
                className="closing-logo img-fluid"
              />
            </div>

            <p className="fst-italic fs-6 lastitalic ">
              Where Champions Are Made.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Course;
