import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./eventheader.scss";

const EventHeader = () => {
  return (
    <Navbar className="Fheader">
      <Container>
        <Nav className="nav-links">
          <Nav.Link
            as={NavLink}
            to="/events/footballleague"
            exact
            activeClassName="active"
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/events/footballleague/fixtures"
            activeClassName="active"
          >
            Fixtures
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/events/footballleague/results"
            activeClassName="active"
          >
            Results
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/events/footballleague/tables"
            activeClassName="active"
          >
            Tables
          </Nav.Link>
          
          <Nav.Link
            as={NavLink}
            to="/events/footballleague/players"
            activeClassName="active"
          >
            Players
          </Nav.Link>

     
        </Nav>
      </Container>
    </Navbar>
  );
};

export default EventHeader;
