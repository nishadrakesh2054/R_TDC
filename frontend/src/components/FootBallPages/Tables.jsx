
// export default Tables;
import React, { useState, useEffect } from "react";
import { Alert, Container, Table } from "react-bootstrap";
import LeagueTop from "./LeagueTop";
import axios from "axios";
import "./LeagueTop.scss";

const Tables = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const runTable = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tables");
        setTeams(response.data.tables);
      } catch (error) {
        setError("Failed to fetch tables. Please try again later.");
      }
    };
    runTable();
  }, []);

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return (
    <>
      <div className="tables">
        <LeagueTop title="League Tables" />
        <Container className="my-5">
          {teams.length === 0 ? (
            <Alert variant="info" className="text-center">
              No data available
            </Alert>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className="team-stats-table rounded p-3"
            >
              <thead className="bg-primary text-white">
                <tr>
                  <th>Position</th>
                  <th>Team Name</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Drawn</th>
                  <th>Lost</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={index} className="table-row">
                    <td className="position">{team.position}.</td>
                    <td className="text-primary fw-semibold team-name">
                      {team.teamName}
                    </td>
                    <td>{team.played}</td>
                    <td>{team.won}</td>
                    <td>{team.drawn}</td>
                    <td>{team.lost}</td>
                    <td>{team.GF}</td>
                    <td>{team.GA}</td>
                    <td>{team.GD}</td>
                    <td className="points">
                      <strong className="text-success">{team.points}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </div>
    </>
  );
};

export default Tables;
