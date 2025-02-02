import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./pro.scss";
import cri from "../../assets/academy/cri1.jpg";
import spe from "../../assets/programs/special.jpg";
import espo from "../../assets/programs/esports.jpg";
import corp from "../../assets/specialCamp/corporate.jpg";

import { Link } from "react-router-dom";
import About from "../aboutSec/About";

const ProgramsOffered = () => {
  return (
    <>
      <div className="progrsm">
        <Container className="pro-container">
          <Row xs={1} md={2} lg={3}>
            <Col>
              <Link to="/academy">
                <div className="academy-proheam-card">
                  <img src={cri} alt="sports-academy" />
                  <div className="box-deg-text">
                    <p>
                      Sports <br /> Academy
                    </p>
                  </div>
                </div>
              </Link>
            </Col>{" "}
            <Col>
              <Link to="/special-camps">
                <div className="academy-proheam-card">
                  <img src={corp} alt="sports-academy" />
                  <div className="box-deg-text">
                    <p>
                      Special <br /> Camps
                    </p>
                  </div>
                </div>
              </Link>
            </Col>{" "}
            <Col>
              <Link to="/e-sports">
                <div className="academy-proheam-card">
                  <img src={espo} alt="sports-academy" />
                  <div className="box-deg-text">
                    <p>E-Sports</p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
        <About />
      </div>
    </>
  );
};

export default ProgramsOffered;
