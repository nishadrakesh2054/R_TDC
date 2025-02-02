import React from "react";
import "./sqd.scss";
import { Container } from "react-bootstrap";
import Squad from "../../../components/academy/squad/Squad";

const SquadProgram = () => {
  return (
    <>
      <div className="Sqd-pro">
        <Container className="sq-con">
          <h1>SQUAD PROGRAMS (COMING SOON)</h1>
          <p>Elevate Your Game, Inspire Your Future</p>
        </Container>
        <Squad />
      </div>
    </>
  );
};

export default SquadProgram;
