import React from "react";
import "./aboutpage.scss";
import { Container } from "react-bootstrap";
import UnderLine from "../../components/helper/UnderLine";
import VisionMission from "../../components/aboutComponent/VisionMission";
// import CoreTeams from "../../components/aboutComponent/CoreTeams";
import Partners from "../../components/partners/Partners";

const About = () => {
  return (
    <>
      <div className="about-page">
        <Container>
          <h1>ABout Thunderbolts</h1>
          <UnderLine />
          <p>
            THUNDERBOLTS DEVELOPMENT CENTER (TDC) is Nepal’s premier sports and
            E-sports academy, dedicated to nurturing talent and fostering
            athletic excellence.
            <br /> <br /> Located on the GEMS School campus, TDC is equipped
            with world-class facilities and infrastructure that cater to the
            sporting aspirations of youth across the country.
            <br /> <br />
            At TDC, we provide tailored programs for grassroots, intermediate,
            and senior athletes, supported by professional coaching,
            cutting-edge sports science, and international collaborations. Our
            vision extends beyond national borders, connecting athletes to
            opportunities globally through partnerships with leading sports
            academies and clubs. We believe in a holistic approach to training,
            focusing on both physical and mental development to ensure success
            on and off the field.
            <br /> <br />
            Whether it’s through football, futsal, cricket, swimming, tennis, or
            esports, TDC is committed to setting new standards in sports
            education and development in Nepal, helping athletes reach their
            full potential while instilling values of discipline, teamwork, and
            perseverance.
            <br /> <br />
          </p>
        </Container>
        <VisionMission />
        <Partners />
        {/* <CoreTeams /> */}
      </div>
    </>
  );
};

export default About;
