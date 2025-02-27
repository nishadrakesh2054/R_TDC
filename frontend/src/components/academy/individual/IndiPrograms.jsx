import React from "react";
import "./indipro.scss";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import placeholder from "../../../assets/academy/thunderbolts-logo.png";

const IndiPrograms = ({ items, titles  }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="indi-pro">
        <Row xs={1} className="g-4 cards-row">
          {items.map((_, idx) => (
            <Col key={idx}>
              <Card border="0" bg="light" className="indi-card">
                <Row xs={1} md={2}>
                  <Col>
                    <div className="image-stu">
                      <Card.Img src={_?.image ? _?.image : placeholder} />
                    </div>
                  </Col>
                  <Col>
                    <Card.Body className="academtennis">
                      <h2>{_?.title}</h2>
                  
                      {titles === "cricket-academy" ? (
                        <h4>{_?.ages}</h4>
                      ) : (
                        <h4>{_?.age}</h4>
                      )}
                      <Card.Text>{_?.dec}</Card.Text>
                      <Button
                        onClick={() => {
                          navigate("/contact");
                        }}
                      >
                        Register Now
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default IndiPrograms;
