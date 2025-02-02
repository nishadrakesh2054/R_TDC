import React from "react";
import "./core.scss";
import { Col, Container, Row } from "react-bootstrap";
import UnderLine from "../helper/UnderLine";
import founder from "../../assets/about/chairmansir.png";
import ed from "../../assets/about/ed.png";

const CoreTeams = () => {
  return (
    <>
      <div className="core-team">
        <Container>
          <div className="core">
            <h1>COre team</h1>
            <UnderLine />
          </div>
          <div className="cor-team-bg">
            {/* <div>
              <p>
                Helvetica Light is an easy-to-read font, with tall and narrow
                letters, that works well on almost every site. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. <br /> <br /> It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. ​ <br /> <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. ​{" "}
                <br /> <br />
                <span>Jone doe</span>
                <br /> <span>Lorem Ipsum</span>
              </p>
            </div> */}
            <div className="img-col">
              <div className="img-side">
                <img src={founder} alt="chairman" />
              </div>
              <p>Mr. Rajesh Khadka</p>
              <h4>Founder Chairman</h4>
            </div>
            <div className="img-col">
              <div className="img-side">
                <img src={ed} alt="md" className="mdphoto-" />
              </div>
              <p>Mr. Rajesh Khadka</p>
              <h4>Founder Chairman</h4>
            </div>
          </div>
          <div className="cor-team-bg">
            {/* <div className="img-col">
              <div className="img-side">
                <img src={ed} alt="md" className="mdphoto" />
              </div>
            </div> */}
            {/* <div>
              <p>
                Helvetica Light is an easy-to-read font, with tall and narrow
                letters, that works well on almost every site. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. <br /> <br /> It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. ​ <br /> <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. ​{" "}
                <br /> <br />
                <span>Jone doe</span>
                <br /> <span>Lorem Ipsum</span>
              </p>
            </div> */}
          </div>
        </Container>
      </div>
    </>
  );
};

export default CoreTeams;
