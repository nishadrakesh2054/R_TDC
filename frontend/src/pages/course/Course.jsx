import React from "react";

import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import "./course.scss";

const Course = () => {
  return (
    <div className="football-course  ">
      <Container>
        {/* Hero Section */}
        <Row className="justify-content-center text-center mb-4">
          <Col md={10}>
            <h1 className="course-title">THUNDERBOLTS DEVELOPMENT CENTER</h1>
            <h4 className="course-subtitle ">FOOTBALL WORKSHOP</h4>
          </Col>
        </Row>

        <Accordion defaultActiveKey="0">
          {/* Introduction to Football Coaching */}
          <Accordion.Item eventKey="0">
            <Accordion.Header  className="accordian-header">
              1. Introduction to Football Coaching
            </Accordion.Header >
            <Accordion.Body>
              Learn the fundamentals of football coaching, including player
              development, game strategies, and leadership skills. This module
              is perfect for beginners who want to step into the world of
              football coaching.
              <div className="text-end  mt-3">
                <Button variant="warning" className="me-2">
                 Download Form
                </Button>
                <Button variant="warning" className="">
                  Register Online
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
};

export default Course;
