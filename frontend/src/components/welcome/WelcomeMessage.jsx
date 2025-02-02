import React from "react";
import { Container } from "react-bootstrap";
import "./wel.scss";

const WelcomeMessage = () => {
  return (
    <>
      <div className="welcome-message">
        <Container className="wel-container">
          <h1>
            Welcome to <br /> <span>Thunderbolts</span>
          </h1>
          <p>
            THUNDERBOLTS DEVELOPMENT CENTER (TDC) is Nepal's first
            international-standard sports and esports academy, dedicated to
            nurturing talent and fostering excellence. TDC offers a
            comprehensive range of sports programs across grassroots,
            intermediate, and senior levels. Our mission is to create a pathway
            for young athletes to achieve success both on and off the field.
          </p>
        </Container>
      </div>
    </>
  );
};

export default WelcomeMessage;
