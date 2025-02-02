import React from "react";
import { Card, CardBody, CardImg, Col, Container, Row } from "react-bootstrap";
import cri from "../../assets/academy/cri1.jpg";
import summ from "../../assets/academy/summing.jpg";
import "./pro.scss";

import { Link } from "react-router-dom";

const items = [
  {
    id: 1,
    title: "SQUAD ACADEMY",
    image: cri,
    link: "/academy/squad-programs",
  },
  {
    id: 2,
    title: "Individual  ACADEMY",
    image: summ,
    link: "/academy/individual-programs",
  },
];

const ProgramsList = () => {
  return (
    <div>
      <div className="sq-pro-car">
        <Container>
          <Row md={2} xs={1} className="">
            {items.map((_, idx) => (
              <Col key={idx} className="mb-4">
                <Link to={_?.link}>
                  <Card className="border-0 ind-cards rounded-0">
                    <CardImg
                      variant="top"
                      src={_?.image}
                      alt="tennis"
                      className="rounded-0"
                    />

                    <CardBody className="card-ind-body">
                      <h3>{_?.title}</h3>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ProgramsList;
