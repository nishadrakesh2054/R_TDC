import React, { useState, useEffect } from "react";
import { Alert, Container, Card, Row, Col } from "react-bootstrap";
import LeagueTop from "./LeagueTop";
import axios from "axios";
import "./LeagueTop.scss";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/results");
        setResults(response.data.results);
      } catch (err) {
        setError("Failed to fetch results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <>
      <div className="fixtures">
        <LeagueTop title="Match Results" />
        <Container>
          {loading ? (
            <div className="text-center py-5">
              <span
                className="spinner-border text-primary"
                role="status"
              ></span>
              <p>Loading results...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : results.length > 0 ? (
            results.map((match, index) => (
              <Card key={index} className="mb-4 border-0">
                <Card.Header className="bg-light text-primary fs-5 fw-bold text-start border-0">
                  {match.date}
                </Card.Header>
                <Card.Body>
                  <Row className="align-items-center py-2 border-bottom mx-5">
                    <Col xs={12} md={6} className="d-flex align-items-center">
                      <img
                        src={match.image1}
                        alt={match.team1}
                        className="team-logo"
                        loading="lazy"
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          borderRadius: "50%",
                          objectFit: "contain",
                        }}
                      />
                      <span className="team-name fw-semibold">
                        {match.team1}
                      </span>
                      <span className="mx-3">
                        <strong className="border p-2 border-warning">
                          {match.score || "TBD"}
                        </strong>
                      </span>
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
                          objectFit: "contain",
                        }}
                      />
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center match-time">{match.time}</div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center match-location">
                        {match.location}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Alert variant="info" className="text-center">
              No result data available
            </Alert>
          )}
        </Container>
      </div>
    </>
  );
};

export default Results;
