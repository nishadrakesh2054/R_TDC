import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useLocation } from "react-router-dom";
import "./nav.scss";
import yelloLogo from "../../assets/logo/white-logo.png";
import sidebtn from "../../assets/button-side.png";
// import TopBanner from "../topBanner/TopBanner";

const NavigationSec = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const location = useLocation();

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  useEffect(() => {
    // Close offcanvas when the route changes
    handleClose();
  }, [location]);

  return (
    <>
      {/* <TopBanner /> */}

      <Navbar
        expand="lg"
        className="navigation-tdc mb-3"
        fixed="top"
        data-bs-theme="dark"
      >
        <Container fluid className="nav-container">
          <NavLink
            activeclassname="active"
            to="/"
            className="now-logo not-show-in-big"
          >
            <img src={yelloLogo} alt="logo" />
          </NavLink>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-md`}
            onClick={handleShow}
          />
          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={handleClose}
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
            className="offcanavs-nav-thunder"
            fullscreen={true}
          >
            <Offcanvas.Header closeButton className="thunder-nav-head-off">
              <div className="logo-nav-off">
                <img src={yelloLogo} alt="logo" />
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body className="thunder_body">
              <Nav className=" flex-grow-1  nav-menu">
                {/* <NavLink
                  activeclassname="active"
                  to="/"
                  onClick={handleClose}
                >
                 Home
                </NavLink> */}
                <NavLink
                  activeclassname="active"
                  to="/about"
                  onClick={handleClose}
                >
                  About
                </NavLink>
                <NavDropdown
                  title="Academy"
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <NavLink
                    activeclassname="active"
                    to="/academy/individual-programs"
                    onClick={handleClose}
                  >
                    Individual Sports
                  </NavLink>
                  <NavDropdown.Divider />

                  <NavLink
                    activeClassName="active"
                    to="/academy/squad-programs"
                    onClick={handleClose}
                  >
                    Squad Sports
                  </NavLink>
                </NavDropdown>

                <NavLink
                  activeclassname="active"
                  to="/special-camps"
                  onClick={handleClose}
                >
                  Special Camps
                </NavLink>

                <NavLink
                  activeclassname="active"
                  to="/e-sports"
                  onClick={handleClose}
                >
                  E-Sports
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/"
                  className="now-logo no-show-small-scree "
                >
                  <img src={yelloLogo} alt="logo" />
                </NavLink>

                <NavDropdown
                  title="Events"
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <NavLink
                    activeclassname="active"
                    to="/events/thunderboltscup"
                    onClick={handleClose}
                  >
                    Thunderbolts Cup
                  </NavLink>
                  <NavDropdown.Divider />
                  <NavLink
                    activeclassname="active"
                    to="/events/footballleague"
                    onClick={handleClose}
                  >
                    Football League
                  </NavLink>
                </NavDropdown>

                <NavLink
                  activeclassname="active"
                  to="/gallery"
                  onClick={handleClose}
                >
                  Gallery
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/contact"
                  onClick={handleClose}
                >
                  Contact
                </NavLink>
                
                <NavLink
                  to="/register-thunderbolts-cup"
                  onClick={handleClose}
                  className="resiter-now-btn-tdc"
                >
                  REGISTER NOW <img src={sidebtn} alt="tdc" />
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationSec;
