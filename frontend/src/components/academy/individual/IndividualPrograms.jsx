import React from "react";
import "./ind.scss";
import { Row, Col, Card } from "react-bootstrap";
import tennis from "../../../assets/academy/tennis.jpg";
import summ from "../../../assets/academy/summing.jpg";

import { Link } from "react-router-dom";

const items = [
  {
    id: 1,
    title: "TENNIS ACADEMY ",
    image: tennis,
    link: "/tennis-academy",
  },
  {
    id: 2,
    title: "THUNDERBOLTS Aquatic",
    image: summ,
    link: "/swimming-academy",
  },
];

const IndividualPrograms = () => {
  return (
    <>
      <div className="indi-pri-card">
        <Row xs={1} md={2} className="g-4">
          {items.map((_, idx) => (
            <Col key={idx}>
              <Link to={_?.link}>
                <Card className="border-0 ind-cards rounded-0">
                  <div className="imga-car-ind">
                    <Card.Img
                      variant="top"
                      src={_?.image}
                      alt="tennis"
                      className="rounded-0"
                    />
                  </div>
                  <Card.Body className="card-ind-body">
                    <h3>{_?.title}</h3>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default IndividualPrograms;
