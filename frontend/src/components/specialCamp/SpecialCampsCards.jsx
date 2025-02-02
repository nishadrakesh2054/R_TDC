import React from "react";
import "./spe-card.scss";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import winter from "../../assets/specialCamp/winter-camp.jpg";
import spe from "../../assets/specialCamp/summer-camp.jpg";
import dev from "../../assets/specialCamp/athletic-development-workshop.jpg";
import yoga from "../../assets/specialCamp/precision-mastery.jpg";
import corp from "../../assets/specialCamp/corporate-league.jpg";
import adv from "../../assets/specialCamp/Adventure-camp.jpg";

import { useNavigate } from "react-router-dom";

const items = [
  {
    id: 1,
    title: "WINTER CAMPS",
    image: winter,
    briefIntro:
      "Stay in peak form this winter with THUNDERBOLTS Winter Camps. Intensive training, expert coaching, and skill development to keep you sharp during the off-season.",
  },
  {
    id: 2,
    title: "SPRING CAMPS",
    image: spe,
    briefIntro:
      "Kickstart your season with THUNDERBOLTS Spring Camps! Enjoy focused training and skill enhancement to boost your performance.",
  },
  {
    id: 3,
    title: "Athletic Development Workshops/Clinics",
    image: dev,
    briefIntro:
      "Enhance your skills with our Workshops and Clinics! Get expert guidance and focused training to refine techniques and improve performance.",
  },
  {
    id: 4,
    title: "Precision Skill Mastery Camps",
    image: yoga,
    briefIntro:
      "Target your skills with our Specific Training Camps! Receive personalized coaching and focused practice to master key techniques and advance your game.",
  },
  {
    id: 5,
    title: "Adventure Camps",
    image: adv,
    briefIntro:
      "Unleash your adventurous spirit! Our Thrill Seekers Adventure Camp offers exciting activities designed to challenge your endurance and teamwork, perfect for those looking to engage with nature and push their personal limits.",
  },
  {
    id: 6,
    title: "Corporate Leagues",
    image: corp,
    briefIntro:
      "Promote team spirit and healthy competition with our Corporate Leagues! Engage your employees in exciting sports events designed to foster collaboration, fitness, and workplace camaraderie.",
  },
];

const SpecialCampsCards = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="speacial-camp-card">
        <Row xs={1} md={2} className="g-4">
          {items.map((_, idx) => (
            <Col key={idx}>
              <Link>
                <Card className="border-0 ind-cards rounded-0">
                  <div className="imga-car-ind">
                    <Card.Img variant="top" src={_?.image} />
                  </div>
                  <Card.Body className="card-ind-body px-0 ">
                    <h3>{_?.title}</h3>
                    <Card.Text>{_?.briefIntro}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              <div className="butoon-car-reg">
                <Button
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  REGISTER NOW
                  <i className="bi bi-chevron-right"></i>
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default SpecialCampsCards;
