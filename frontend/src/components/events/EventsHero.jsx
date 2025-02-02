import React from "react";
import "./events.scss";
import eve from "../../assets/evenst/even1.jpg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import tbclogo from "../../assets/evenst/TBC_LOGO.png";

const EventsHero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="evenst-ger">
        <div className="text-side-events">
          <div className="tdc-logo">
            <img src={tbclogo} alt="thunderbolts" className="tbc-logo" />

            <h1>THUNDERBOLTS CUP</h1>
          </div>
          <p>
            At GEMS, the Thunderbolt is taken as a symbol that exhibits the
            attributes of its members, never losing heart, even if defeated, but
            reflecting on where they went wrong and mending the weaknesses to
            become more goal- oriented, determined, and focused on their
            destination. The THUNDERBOLTS work relentlessly in order to achieve
            victory, not letting any setbacks deter their aim and desire to win.{" "}
            <br />
            <br /> The THUNDERBOLTS Cup has been conceptualised to bring
            together those schools in Nepal which aim to develop, upgrade and
            promote a progressive sporting culture in the country. The
            competition comprises numerous wide ranging disciplines through
            which shared values of sportsmanship, comradeship and love for
            sports can be created for a holistic sporting environment.
          </p>
          {/* <Button
            onClick={() => {
              navigate("/contact");
            }}
          >
            LEARN MORE <i className="bi bi-chevron-right"></i>
          </Button> */}
        </div>
        {/* <div className="events-side-img">
          <img src={eve} alt="thunderbolts" />
        </div> */}
      </div>
    </>
  );
};

export default EventsHero;
