import React from "react";
import { Button, Container } from "react-bootstrap";
import "./abut.scss";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate("/about");
  return (
    <>
      <div className="about-passion ">
        <Container className="about-con">
          <h1>
            From Passion to <br /> <span>Performance</span>
          </h1>
          <p>
            With world-class facilities, expert coaches, and a strong focus on
            development, we provide a supportive environment where talent
            thrives. <br /> Whether you're training for fun or aiming for the
            professional stage, TDC is the place to elevate your game.
          </p>
          <div className="button-about">
            <Button
              onClick={() => {
                navigate("/about");
              }}
            >
              LEARN MORE
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default About;
