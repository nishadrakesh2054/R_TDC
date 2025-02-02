import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Alert } from "react-bootstrap";
import LeagueTop from "./LeagueTop";
import {useNavigate} from 'react-router-dom'

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/fixtures");
        setFixtures(response.data.fixtures);
      } catch (err) {
        setError("Failed to fetch fixtures. Please try again later.");
      }
    };

    fetchFixtures();
  }, []);

  if (error) {
    return (
      <Alert variant="danger">
        <strong>Error:</strong> {error}
      </Alert>
    );
  }
const navigate=useNavigate()
  return (
    <>
      <div className="fixtures">
        <LeagueTop title="Upcoming Fixtures" />
        <Container>
          {fixtures.length > 0 ? (
            fixtures.map((fixture, idx) => (
              <Card key={idx} className="mb-4 border-0">
                <Card.Header className="bg-light text-primary fs-5 fw-bold text-start border-0">
                  {fixture.date}
                </Card.Header>
                <Card.Body>
                  {fixture.matches.map((match) => (
                    <Row
                      key={match.id}
                      className="align-items-center py-2 border-bottom mx-5"
                    >
                      <Col xs={12} md={6} className="d-flex align-items-center">
                        <img
                          src={match.image1}
                          alt={match.team1}
                          className="team-logo"
                          style={{
                            width: "40px",
                            height: "40px",
                            marginRight: "10px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                        <span className="team-name fw-semibold"  >
                          {match.team1}
                        </span>
                        <span className="mx-2">vs</span>
                        <span className="team-name fw-semibold">
                          {match.team2}
                        </span>
                        <img
                          src={match.image2}
                          alt={match.team2}
                          className="team-logo"
                          style={{
                            width: "40px",
                            height: "40px",
                            marginLeft: "10px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="text-center match-time">
                          {match.time}
                        </div>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="text-center match-location">
                          {match.location}
                        </div>
                      </Col>
                    </Row>
                  ))}
                </Card.Body>
              </Card>
            ))
          ) : (
       <Alert variant="info" className="text-center">
                     No fixture data available
                   </Alert>
          )}
        </Container>
      </div>
    </>
  );
};

export default Fixtures;
