import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import LeagueTop from "./LeagueTop";
import { FaRegFutbol } from "react-icons/fa";
import "./LeagueTop.scss";

const PlayerDetails = () => {
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [teamDetails, setTeamDetails] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/players");
        if (response.data.success) {
          const filteredPlayers = response.data.players.filter(
            (player) => player.teamId.toLowerCase() === id.toLowerCase()
          );
          setPlayers(filteredPlayers);
          // Set team details from the first player's team
          if (filteredPlayers.length > 0) {
            setTeamDetails(filteredPlayers[0].team);
          }

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <Spinner animation="border" variant="primary" />
        <p>Loading teams...</p>
      </div>
    );
  }

  return (
    <div className="fixtures">
      <LeagueTop title={`Players of ${id}`} />
      <Container>
        {/* Team Details Section */}
        {teamDetails && (
          <Row className="my-5 align-items-center">
            <Col md={3} className="text-center">
              {teamDetails.team_logo && (
                <img
                  src={teamDetails.team_logo}
                  alt={`${teamDetails.team_name} logo`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              )}
              <h1 className="font-bold">{teamDetails.team_name}</h1>
            </Col>
            <Col md={9}>
              <p>{teamDetails.team_details}</p>
            </Col>
          </Row>
        )}

        <Row>
          {players.length > 0 ? (
            players.map((player) => (
              <Col md={4} lg={4} key={player.id} className="mb-4">
                <Card className="player-card">
                  {/* Player Details */}
                  <Card.Img
                    variant="top"
                    src={player.player_image}
                    alt={`${player.player_name} image`}
                    className="player-img"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>
                      <FaRegFutbol size={24} color="#333" /> &nbsp;
                      {player.player_name}
                    </Card.Title>
                    <Card.Text>
                      <strong>Position:</strong> {player.position}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex justify-content-start flex-column">
                        <Card.Text>
                          <strong>Height:</strong> {player.height} cm
                        </Card.Text>
                        <Card.Text>
                          <strong>Weight:</strong> {player.weight} kg
                        </Card.Text>
                        <Card.Text>
                          <strong>Age:</strong> {player.age} yr
                        </Card.Text>
                      </div>

                      <div>
                        <Card.Text>
                          <strong>Goals Scored:</strong> {player.goalsScored}
                        </Card.Text>
                        <Card.Text>
                          <strong>Matches Played:</strong>{" "}
                          {player.matchesPlayed}
                        </Card.Text>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p>No players found for this team.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default PlayerDetails;
