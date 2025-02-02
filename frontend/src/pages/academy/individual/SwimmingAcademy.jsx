import React from "react";
import "./tennish.scss";
import { Container } from "react-bootstrap";
import IndiPrograms from "../../../components/academy/individual/IndiPrograms";
import grass from "../../../assets/academy/swimming/grass.jpg";
import intermed from "../../../assets/academy/swimming/iinter.jpg";
import inelttermed from "../../../assets/academy/swimming/elit.jpg";

const items = [
  {
    id: 1,
    title: "Grassroots",
    age: "6 – 10 years old",
    image: grass,
    acadeny: "SWIMMING",
    dec: "Our Grassroots program is designed to introduce young athletes to the fundamentals of sports in a fun and engaging environment. Through age-appropriate training and activities, we nurture their passion for sports while building essential skills. Athletes in this category will have the opportunity to participate in beginner and non-beginner groups, ensuring tailored coaching that caters to their individual needs and abilities.",
  },
  {
    id: 2,
    title: "Intermediate",
    age: " 11 - 15 years old",
    image: intermed,
    acadeny: "SWIMMING",
    dec: "The Intermediate program focuses on refining skills and enhancing performance for young athletes ready to take their game to the next level. With a more structured approach, this level emphasizes skill development, teamwork, and competition. Athletes can choose between beginner and non-beginner groups to ensure they receive the right support and challenge, preparing them for future sporting endeavors.",
  },
  {
    id: 3,
    title: "Senior",
    age: " 16 – 19 years old",
    image: inelttermed,
    dec: "Our Senior program is tailored for aspiring athletes looking to excel in their chosen sport. At this level, we focus on advanced training techniques, performance optimization, and competitive readiness. Athletes will benefit from specialized coaching in either beginner or non-beginner groups, allowing for personalized development that meets their individual goals and aspirations.",
  },
];

const SwimmingAcademy = () => {
  return (
    <>
      <div className="swimming-academy tennish">
        <Container>
          <div className="tennis-aca-heading-conta">
            <h1>THUNDERBOLTS Aquatic (COMING SOON)</h1>
            <p>
              Dive into excellence at THUNDERBOLTS! We offer top-notch training
              with expert coaches and state-of-the-art facilities, designed to
              help swimmers of all levels improve their technique and achieve
              their goals. Whether you're just starting out or aiming for
              competitive success, our programs provide a supportive and
              effective environment for every swimmer. Join us and make a splash
              in your swimming journey!
            </p>
          </div>
          <IndiPrograms items={items} />
        </Container>
      </div>
    </>
  );
};

export default SwimmingAcademy;
