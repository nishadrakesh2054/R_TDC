
// export default PointsTable;
import React, { useEffect, useState } from "react";
import { Table, Container, Row } from "react-bootstrap";
import "./PointsTable.scss";
import axios from "axios";

// Helper function to add position suffix (st, nd, rd, th)
const getPositionWithSuffix = (position) => {
  if (!position) return "-"; // Prevents errors if position is undefined/null
  const lastDigit = position % 10;
  const lastTwoDigits = position % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return `${position}th`;
  switch (lastDigit) {
    case 1: return `${position}st`;
    case 2: return `${position}nd`;
    case 3: return `${position}rd`;
    default: return `${position}th`;
  }
};

const PointsTable = () => {
  const [schools, setSchools] = useState([]); // Ensure it's an array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("/api/points-table/");
        console.log("Points Table Response:", response.data);

        // Ensure response is an array before updating state
        if (Array.isArray(response.data)) {
          setSchools(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setSchools([]); // Fallback to empty array
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data"); // Set error message
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchSchools();
  }, []);

  return (
    <Container className="points-table-container">
      <Row>
        <h1>
          THUNDERBOLTS CUP <span>2024</span> STANDINGS
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : schools.length === 0 ? (
          <p>No data available</p>
        ) : (
          <div className="points-table">
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>School</th>
                  <th>Gold</th>
                  <th>Silver</th>
                  <th>Bronze</th>
                  <th>Total Points</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school, index) => (
                  <tr key={index}>
                    <td>{getPositionWithSuffix(school.position)}</td>
                    <td className="schoolname">{school.schoolName || "-"}</td>
                    <td>{school.goldFirst ?? "-"}</td>
                    <td>{school.silverSecond ?? "-"}</td>
                    <td>{school.bronzeThird ?? "-"}</td>
                    <td>{school.totalPoints ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default PointsTable;
