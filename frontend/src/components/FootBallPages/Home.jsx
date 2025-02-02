import React from "react";
import { Container, Button } from "react-bootstrap";

import FootballImg from '../../assets/contact/contactHead.jpg'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-banner" style={heroStyle}>
        <Container className="text-center text-light">
          <h1 className="display-4 font-weight-bold">Welcome to the ThunderBolts Football League</h1>
          <p className="lead mt-3">Catch the Action, Witness the Glory!</p>
          <Button variant="warning" className="mt-4 btn-lg">
            Explore Fixtures
          </Button>
        </Container>
      </div>

    </>
  );
};

// Hero Section Inline Styles
const heroStyle = {
  backgroundImage:
    `url(${FootballImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "100px 0",
  position: "relative",
};

export default Home;
