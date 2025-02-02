import React from "react";
import { Container } from "react-bootstrap";
import GetInTouch from "../academy/GetInTouch";
import "./esport.scss";

const Esports = () => {
  return (
    <>
      <div className="esports">
        <Container className="e-con-sp">
          <div className="text-comme-cont">
            <h1>We Are Coming</h1>
            <p className="animate__animated animate__bounce">SOON</p>
          </div>
        </Container>
      </div>
      <GetInTouch mt="0" />
    </>
  );
};

export default Esports;
