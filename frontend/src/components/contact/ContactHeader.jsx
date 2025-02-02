import React from "react";
import "./ContactHeader.scss";
import sch from "../../assets/contact/contactHead.jpg";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ContactHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className="evenst-ger-c">
          <div className="events-side-img">
            <img src={sch} alt="thunderbolts" />
          </div>
          <div className="text-side-events">
            <h3>Join the Future of Sports in Nepal</h3>
            <p>
              Enrolling is easy. Discover how we can help you reach the next
              level.
            </p>
            <div className="socials-list">
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
              <Link to="https://www.tiktok.com/@thunderboltsdc" target="_blank">
                <i className="bi bi-tiktok"></i>{" "}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContactHeader;
