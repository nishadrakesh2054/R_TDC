import React from "react";
import "./WhyTdc.scss";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../assets/academy/cricket.jpg";
const WhyTdc = () => {
  return (
    <>
      <div className="ehy-tdc">
        <Container>
          <div className="why-conai-t">
            <h1>Why TDC?</h1>
            <Carousel fade indicators={true}>
              <Carousel.Item>
                <Carousel.Caption>
                  <h2>International Collaborations</h2>
                  <p>
                    We have tie-ups and partnerships with various international
                    sporting companies and clubs, providing unique opportunities
                    for our members to engage in global sporting experiences.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <h2>World-Class Facilities</h2>
                  <p>
                    Our international-standard facilities provide top-tier
                    equipment and spaces for football, tennis, swimming, and
                    esports, ensuring a professional environment for athletes at
                    all levels.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <h3>Expert Coaching</h3>
                  <p>
                    Our licensed coaches offer personalized training programs,
                    helping athletes of all skill levels reach their potential
                    with expert guidance and support.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <h3>Holistic Development</h3>
                  <p>
                    From sports science to nutrition and mental health, we focus
                    on every aspect of athlete development.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <h2>Pathway to Success</h2>
                  <p>
                    We help connect athletes to local and international
                    opportunities for professional growth.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </Container>
      </div>
    </>
  );
};

export default WhyTdc;
