import React from "react";
import "./evnst.scss";
import { Container } from "react-bootstrap";
import EventsHero from "../../components/events/EventsHero";
// import ForThunderboltsRegister from "../../components/events/ForThunderboltsRegister";
import GetInTouch from "../academy/GetInTouch";
import EventsList from "../../components/events/EventsList";
import PointsTable from "../../components/events/PointsTable";

const Events = () => {
  return (
    <>
      <div className="events-page">
        <Container>
          <EventsHero />
          <EventsList />
          <PointsTable />
          {/* <ForThunderboltsRegister /> */}
        </Container>
      </div>
      <GetInTouch mt="0" />
    </>
  );
};

export default Events;
