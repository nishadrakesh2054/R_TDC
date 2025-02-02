import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import avya from "../../assets/partners/avya.webp";
import hams from "../../assets/partners/HAMS.png";
import gems from "../../assets/partners/gems-logo.png";
import thunder from "../../assets/partners/NOC.png";
import paro from "../../assets/partners/Paro_FC_logo_final_JPG-min.png";
import "./paernert.scss";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Partners = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="paertners">
        <Container>
          <h1>OUR PARTNERS</h1>
          <div className="partenrs-link-d">
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={false}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px partenrs-link"
            >
              <Link to="https://avya.club/" target="_blank">
                <div className="part-img-link">
                  <img src={avya} alt="avya" />
                </div>
              </Link>

              <Link to="https://hamshospital.com/" target="_blank">
                <div className="part-img-link">
                  <img src={hams} alt="hams" />
                </div>
              </Link>
              <Link to="https://gems.edu.np/" target="_blank">
                <div className="part-img-link games-logo">
                  <img src={gems} alt="hams" />
                </div>
              </Link>
              <Link to="https://parofc.com/" target="_blank">
                <div className="part-img-link">
                  <img src={paro} alt="hams" />
                </div>
              </Link>
              <Link to="https://gems.edu.np/sports-activities" target="_blank">
                <div className="part-img-link">
                  <img src={thunder} alt="hams" />
                </div>
              </Link>
            </Carousel>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Partners;
