import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./vision.scss";

const VisionMission = () => {
  return (
    <>
      <div className="vision-mission">
        <Container>
          <Row className="visi-mis" xs={1} md={2}>
            <Col className="vision mt-5">
              <h1>
                <i className="bi bi-globe"></i>
                Our Vision
              </h1>
              <p className="mb-0">
                THUNDERBOLTS DEVELOPMENT CENTER envisions becoming Nepal's
                leading sports and e-sports academy, with multiple centers
                across the country. We aim to set new standards of excellence
                and own professional clubs that provide a clear pathway for
                elite athletes, bringing pride to Nepal on national and
                international stages.
              </p>
            </Col>
            <Col className="mission mt-5">
              <h1>
                <i className="bi bi-lightning"></i> Our Mission
              </h1>
              <p className="mb-0">
                Our mission is to nurture talent, develop elite athletes, and
                organize world-class sports and e-sports events. We provide
                comprehensive training, state-of-the-art facilities, and support
                for athletes of all ages, fostering excellence, discipline, and
                sportsmanship. We empower individuals to reach their full
                potential and positively impact the sports and e-sports industry
                in Nepal and beyond.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default VisionMission;
