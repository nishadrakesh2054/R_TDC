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
import { useNavigate } from "react-router-dom";
import thunderboltsbup from "/thunderbolts-logo.png";

import downloadPdf from "./downloadPdf";
import "./RegistrationPage.scss";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    contactNo: "",
    type: "",
    category: "",
    game: "",
    numberOfParticipants: 1,
    email: "",
    address: "",
    emergencyContactname: "",
    emergencyContactrelation: "",
    dob: "",
  });
  const [games, setGames] = useState([]);
  const [fee, setFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [displayGame, setDisplayGame] = useState("");
  const [displayCategory, setDisplayCategory] = useState("");
  const [isPdfDownloaded, setIsPdfDownloaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/api/tdcgames");
        setGames(response.data);
      } catch (err) {
        setError(
          "There was an error fetching the games. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "game") {
      setDisplayGame(value);
      setDisplayCategory(""); // Reset display category
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: "", // Reset category in formData
      }));
    }

    if (name === "category") {
      const selectedGame = categoriesForSelectedGame.find(
        (game) => game.category === value
      );

      if (selectedGame) {
        setFee(selectedGame.fee * formData.numberOfParticipants);
        setDisplayCategory(value); // Set display category
        setFormData((prevFormData) => ({
          ...prevFormData,
          category: value, // Ensure category is set
          game: selectedGame.id, // Store the game ID here
        }));
      }
    }

    if (name === "numberOfParticipants") {
      // Recalculate fee when number of participants changes
      const selectedGameForFee = categoriesForSelectedGame.find(
        (game) => game.id === formData.game
      );

      if (selectedGameForFee) {
        setFee(selectedGameForFee.fee * value); // Update fee based on number of participants
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPdfDownloaded) {
      setFormError("Please download the registration form before submitting.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    setSuccessMessage("");

    const selectedGame = games.find(
      (game) => game.category === formData.category && game.id === formData.game
    );

    if (!selectedGame) {
      setFormError("Selected category does not match any game.");
      setIsSubmitting(false);
      return;
    }

    const { category, ...filteredFormData } = {
      ...formData,
      game: selectedGame.id,
    };

    try {
      //   console.log(filteredFormData);
      const preCheckResponse = await axios.post(
        "http://localhost:3000/api/tdcpre-check-registration/",
        filteredFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (preCheckResponse.data.success) {
        sessionStorage.setItem("formData", JSON.stringify(filteredFormData));
        sessionStorage.setItem("fee", fee);
        navigate("/payment-form", {
          state: {
            filteredFormData,
            fee,
          },
        });
      } else {
        setFormError(
          preCheckResponse.data.message || "Pre-registration check failed."
        );
      }
    } catch (error) {
      if (error.response) {
        setFormError(
          error.response.data.message || "An unexpected error occurred."
        );
      } else if (error.response.data && error.response.data.error) {
        setFormError(error.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredGames = Array.isArray(games)
    ? games.filter((game) => game.type === formData.type)
    : [];
  const uniqueGameNames = Array.from(
    new Set(filteredGames.map((game) => game.name))
  );
  const categoriesForSelectedGame = filteredGames?.filter(
    (game) => game.name === displayGame
  );

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
        {/* <div className="deadlin-regis"></div> */}
        <div className="from-regis">
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <Form className="form-regise " onSubmit={handleSubmit}>
              <Row xs={1} md={2}>
                <Form.Group
                  as={Col}
                  controlId="formGridSchoolName"
                  className="mb-3"
                >
                  <Form.Label>SCHOOL NAME</Form.Label>
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

                <Form.Group
                  as={Col}
                  controlId="formGridContactNo"
                  className="mb-3"
                >
                  <Form.Label>CONATCT NO</Form.Label>
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
              </Row>

              <Row>
                <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                  <Form.Label>EMAIL</Form.Label>
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
                  controlId="formGridAddress"
                  className="mb-3"
                >
                  <Form.Label>ADDRESS</Form.Label>
                  <Form.Control
                    type="address"
                    name="address"
                    placeholder="Enter your address"
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
                  controlId="formGridEmpPerName"
                  className="mb-3"
                >
                  <Form.Label>EMERGENCY CONTACT PERSON NAME</Form.Label>
                  <Form.Control
                    type="emergencyContactname"
                    name="emergencyContactname"
                    className="form-input"
                    placeholder="Enter contact person name"
                    value={formData.emergencyContactname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridEmpPerRelation"
                  className="mb-3"
                >
                  <Form.Label>EMERGENCY CONTACT PERSON RELATION</Form.Label>
                  <Form.Control
                    type="emergencyContactrelation"
                    name="emergencyContactrelation"
                    placeholder="Enter contact person relation"
                    className="form-input"
                    value={formData.emergencyContactrelation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDob" className="mb-3">
                  <Form.Label>DATE OF BIRTH</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    className="form-input text-secondary "
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>

              <Row xs={1} md={3}>
                <Form.Group as={Col} controlId="formGridType" className="mb-3">
                  <Form.Label>GAME TYPE</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-input text-secondary"
                    required
                  >
                    <option>Choose...</option>
                    <option value="Squad">Squad</option>
                    <option value="Individual">Individual</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridGame" className="mb-3">
                  <Form.Label>SPORTS</Form.Label>
                  <Form.Select
                    name="game"
                    value={displayGame} // Use displayGame for dropdown
                    onChange={handleChange}
                    disabled={!formData.type}
                    className="form-input text-secondary"
                    required
                  >
                    <option>choose...</option>
                    {uniqueGameNames.map((gameName, idx) => (
                      <option key={idx} value={gameName}>
                        {gameName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridCategory"
                  className="mb-3"
                >
                  <Form.Label>PROGRAM</Form.Label>
                  <Form.Select
                    name="category"
                    value={displayCategory}
                    onChange={handleChange}
                    className="form-input text-secondary"
                    disabled={!displayGame}
                    required
                  >
                    <option>Choose...</option>
                    {categoriesForSelectedGame.map((game) => (
                      <option key={game.id} value={game.category}>
                        {game.category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>

              {formData?.type == "Individual" && (
                <Row xs={1} md={2}>
                  <Form.Group
                    as={Col}
                    controlId="formGridParticipants"
                    className="mb-3"
                  >
                    <Form.Label>Number of Participants</Form.Label>
                    <Form.Control
                      type="number"
                      className="form-input"
                      name="numberOfParticipants"
                      value={formData.numberOfParticipants}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </Form.Group>
                </Row>
              )}

              {displayCategory && (
                <Row className="mb-3">
                  <Col>
                    <Button
                      className="download-btn-registertaion-from"
                      onClick={() => {
                        downloadPdf(displayGame, displayCategory);
                        setIsPdfDownloaded(true); // Mark PDF as downloaded
                        setFormError(null);
                      }} // Call downloadPdf here
                    >
                      {displayGame} {displayCategory} Player Registration Form{" "}
                      <i className="bi bi-file-earmark-arrow-down"></i>
                    </Button>
                  </Col>
                </Row>
              )}

              {formError && <Alert variant="danger">{formError}</Alert>}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="paynow-btn"
              >
                {isSubmitting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  `Pay Now NRP. ${fee}/-`
                )}
              </Button>
            </Form>
          )}
        </div>
      </Container>
    </div>
  );
};

export default RegistrationPage;











// .register-page {
//     background: #e7f0ff;
//     padding-top: 8rem;
//     padding-bottom: 5rem;
//     .logo-text-thunder {
//       display: flex;
//       justify-content: center;
//       align-items: center;
  
//       gap: 3rem;
//       flex-wrap: wrap;
//       .logo-thunder {
//         width: 8rem;
//         img {
//           width: 100%;
//         }
//         @media (max-width: 768px) {
//           width: 7rem;
//         }
//       }
//       .text-thi {
//         h1 {
//           text-align: center;
//           color: #ffbb00;
//           font-weight: bold;
//           letter-spacing: 3px;
//           text-transform: uppercase;
//           margin-bottom: 0;
//           text-shadow: 2px 2px 4px #2060c7;
//         }
//         h2 {
//           text-align: center;
//           text-transform: uppercase;
//           color: #2060c7;
//           margin-bottom: 0;
//         }
//       }
//       @media (max-width: 768px) {
//         gap: 1rem;
//       }
//     }
  
//     .from-regis {
//       margin-top: 2rem;
  
//       .form-regise {
//         border-radius: 4px;
  
//         box-shadow: 0 2px 4px rgba(32, 96, 199, 0.1),
//           0 4px 8px rgba(32, 96, 199, 0.2);
  
//         padding: 3rem;
//         .form-label {
//           color: #444343;
//           font-weight: 500;
//         }
//         input,
//         .form-control,
//         .form-select {
//           background-color: transparent;
//           color: #fff;
//           border-radius: 0%;
//           option {
//             color: #000;
//             background-color: rgb(228, 239, 255);
//             border-radius: 0%;
//             border: none;
//           }
//         }
//         button {
//           background-color: #fff;
//           border: none;
//           padding-left: 3rem;
//           padding-right: 3rem;
//           border-radius: 0% !important;
  
//           &:hover {
//             background-color: rgba(0, 73, 190, 1);
//             border: none;
//             color: #fec802;
//           }
//         }
//         .download-btn-registertaion-from {
//           border-radius: 0% !important;
//           text-transform: uppercase;
//         }
//         .paynow-btn {
//           background-color: #fec802;
//         }
//         p {
//           color: #fff;
//           margin-top: 3rem;
//           margin-bottom: 0rem;
//         }
//         @media (max-width: 768px) {
//           padding: 1rem;
//         }
//       }
//     }
  
//     .form-input {
//       border: 1px solid #85acff;
//       border-radius: 5px !important;
//       padding: 0.5rem;
//       font-size: 1rem;
//       transition: border-color 0.3s ease;
//       background-color: rgb(255, 255, 255) !important;
//     }
  
//     .form-input:focus {
//       border-color: #007bff;
//       box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
//     }
//     @media (max-width: 768px) {
//       padding-top: 7rem;
//     }
//   }
  
