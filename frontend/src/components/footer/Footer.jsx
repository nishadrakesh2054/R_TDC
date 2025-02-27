import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./footer.scss";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="footer-f">
        <Container>
          <Row xs={1} md={2} lg={3}>
            <Col className="col-a mt-5">
              <h2>
                home <br />
                of the thunderbolts
              </h2>
              <div className="socials">
                <p>
                  <Link
                    to="https://www.facebook.com/profile.php?viewas=100000686899395&id=61565989542989"
                    target="_blank"
                  >
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link
                    to="https://www.instagram.com/thunderboltsdc"
                    target="_blank"
                  >
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link
                    to="https://www.tiktok.com/@thunderboltsdc"
                    target="_blank"
                  >
                    <i className="bi bi-tiktok"></i>
                  </Link>
                </p>
              </div>
              <Button
                onClick={() => {
                  navigate("/contact");
                }}
              >
                Register Now
              </Button>
            </Col>
            <Col className="col-b mt-5">
              <div className="col-b-cont">
                <h4>MENU</h4>
                <div className="quick-links">
                  <Link to="/about">About</Link>
                  <Link to="/academy/individual-programs">
                    Individual Programs
                  </Link>
                  <Link to="/academy/squad-programs">Squad Programs</Link>
                  <Link to="/special-camps">Special Camps</Link>
                  <Link to="/e-sports">E-Sports</Link>
                  {/* <Link>Pricing</Link> */}
                  <Link to="/gallery">Gallery</Link>
                  <Link to="/events/thunderboltscup">Events</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/career">Career</Link>
                </div>
              </div>
            </Col>
            <Col className="col-c mt-5">
              <div className="col-c-cont">
                <div className="operation-hr">
                  <h4>Hours of operation</h4>
                  <p>
                    Mon-Fri: 10:00 AM to 6:00 PM <br />
                    Sat-Sun: 8:00 AM to 12:00 PM
                  </p>
                </div>
                <div className="conatct-det-fot operation-hr">
                  <h4>contact us</h4>
                  <p>Dhapakhel, Lalitpur, Nepal</p>
                  <p>Mail: info@thunderbolts.com.np</p>
                  <p>Tel: +977 980 197 3967</p>
                  <p>Tel: +977 980 197 3975</p> <br />
                  <p>
                    © {new Date().getFullYear()}. Powered by{" "}
                    <Link to="https://1or8.com.np/" target="_blank">
                      1or8
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
