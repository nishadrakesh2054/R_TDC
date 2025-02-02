import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./contact.scss";
import { Link } from "react-router-dom";
import ContactFrom from "./ContactFrom";

const Contact = () => {
  return (
    <>
      <div className="contact">
        <Container className="con-container">
          <Row md={2} xs={1} className="con-row">
            <Col>
              <h1>CONTACT</h1>
              <div className="conta-dets">
                <p>
                  <i className="bi bi-geo-alt"></i> Dhapakhel, Lalitpur, Nepal
                </p>
                <p>
                  <i className="bi bi-telephone"></i> +977 980 197 3967
                </p>
                <p>
                  <i className="bi bi-envelope"></i> info@thunderbolts.com.np
                </p>
                <div className="social-c">
                  <p>
                    <i className="bi bi-hand-thumbs-up"></i>
                  </p>
                  <p>
                    <Link
                      to="https://www.facebook.com/profile.php?viewas=100000686899395&id=61565989542989"
                      target="_blank"
                    >
                      <i className="bi bi-facebook"></i>{" "}
                    </Link>
                    <Link
                      to="https://www.instagram.com/thunderboltsdc"
                      target="_blank"
                    >
                      <i className="bi bi-instagram"></i>
                    </Link>{" "}
                    <Link
                      to="https://www.tiktok.com/@thunderboltsdc"
                      target="_blank"
                    >
                      <i className="bi bi-tiktok"></i>{" "}
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <ContactFrom />
            </Col>
          </Row>
          <div className="map-embade">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.4274419317535!2d85.32312107611213!3d27.642244128358538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb17005434cb05%3A0xa7dc16fb1af01d1!2sThunderbolts%20Development%20Center!5e0!3m2!1sen!2snp!4v1724835834200!5m2!1sen!2snp"
              width="100%"
              height="450"
              allowfullscreen="true"
              loading="lazy"
            ></iframe>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Contact;
