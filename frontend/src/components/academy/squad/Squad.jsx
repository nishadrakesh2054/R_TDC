import React from "react";
import "./sq.scss";
import {
  Button,
  Row,
  Col,
  CardImg,
  CardBody,
  Card,
  Container,
} from "react-bootstrap";
import cri from "../../../assets/academy/cri1.jpg";
import fot from "../../../assets/academy/football.jpg";
import futsal from "../../../assets/academy/futsal.jpg";

import { Link } from "react-router-dom";

const items = [
  {
    id: 1,
    title: "CRICKET ACADEMY",
    image: cri,
    link: "/tennis-academy",
  },
  {
    id: 2,
    title: "Futsal  ACADEMY",
    image: futsal,
    link: "/swimming-academy",
  },
  {
    id: 2,
    title: "Football   ACADEMY",
    image: fot,
    link: "/swimming-academy",
  },
];

const Squad = () => {
  return (
    <>
      <div className="sq-pro-car">
        <Container>
          <Row md={2} xs={1} className="">
            {items.map((_, idx) => (
              <Col key={idx} className="mb-4">
                <Link
                  to={`/academy/squad-programs/${_?.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
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
    </>
  );
};

export default Squad;
