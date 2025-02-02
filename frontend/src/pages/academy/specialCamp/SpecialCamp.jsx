import React from "react";
import "./spe.scss";
import { Container } from "react-bootstrap";
import SpecialCampsCards from "../../../components/specialCamp/SpecialCampsCards";

const SpecialCamp = () => {
  return (
    <>
      <div className="special-camps">
        <Container>
          <h1>SPECIAL CAMPS</h1>
          <p>
            Explore new challenges, refine your skills, and connect with fellow
            athletes in an environment that fosters growth and success. No
            matter your level or sport, our special camps provide the perfect
            opportunity to push your limits and take your performance to new
            heights.
          </p>
          <SpecialCampsCards />
        </Container>
      </div>
    </>
  );
};

export default SpecialCamp;
