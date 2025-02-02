import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import LeagueTop from "./LeagueTop";
import "./LeagueTop.scss";
import { FaLongArrowAltRight } from "react-icons/fa";

const Player = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/teams")
      .then((response) => {
        if (response.data.success) {
          setTeams(response.data.teams);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fixtures">
      <LeagueTop title="Teams Overview" />
      <Container>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading teams...</p>
          </div>
        ) : teams.length === 0 ? ( // Check if the `teams` array is empty
          <div className="text-center py-5">
            <Alert variant="info">No data available</Alert>
          </div>
        ) : (
          <Row>
            {teams.map((team) => (
              <Col md={6} lg={4} key={team.team_name} className="mb-4">
                <Card className="team-card shadow border-0">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <img
                        src={team.team_logo}
                        alt={team.team_name}
                        className="team-logo me-3"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "contain",
                        }}
                      />
                      <Card.Title className="mb-0">{team.team_name}</Card.Title>
                    </div>
                    <Link to={`/events/footballleague/players/${team.team_name}`}>
                      <Button variant="primary" className="text-center mt-3">
                        View Players <FaLongArrowAltRight />
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Player;
