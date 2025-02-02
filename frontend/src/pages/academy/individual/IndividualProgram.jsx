import React from "react";
import { Container } from "react-bootstrap";
import "./ind.scss";
import IndividualPrograms from "../../../components/academy/individual/IndividualPrograms";
import GetInTouch from "../GetInTouch";

const IndividualProgram = () => {
  return (
    <>
      <div className="individual-program">
        <Container>
          <h1>INDIVIDUAL PROGRAMS</h1>
          <IndividualPrograms />
        </Container>
        <GetInTouch />
      </div>
    </>
  );
};

export default IndividualProgram;
