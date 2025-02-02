import React from "react";
import { Container } from "react-bootstrap";
import "./academy.scss";
import ProgramsList from "../../components/academy/ProgramsList";

const Academy = () => {
  return (
    <div className="academy">
      <Container>
        <h1>Sports Academy (COMING SOON)</h1>
        <p>Elevate Your Game, Inspire Your Future</p>
      </Container>
      <ProgramsList />
    </div>
  );
};

export default Academy;
