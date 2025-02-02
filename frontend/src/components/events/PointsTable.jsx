import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import "./PointsTable.scss";
import axios from "axios";

// Helper function to add position suffix (st, nd, rd, th)
const getPositionWithSuffix = (position) => {
  const lastDigit = position % 10;
  const lastTwoDigits = position % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${position}th`;
  }
  switch (lastDigit) {
    case 1:
      return `${position}st`;
    case 2:
      return `${position}nd`;
    case 3:
      return `${position}rd`;
    default:
      return `${position}th`;
  }
};

const PointsTable = () => {
  const [schools, setSchools] = useState([]);

  const fetchSchools = () => {
    const options = {
      method: "GET",
      url: "/api/points-table/",
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        setSchools(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <Container className="points-table-container">
      <Row className="">
        <h1>
          THUNDERBOLTS CUP <span>2024</span> STANDINGS
        </h1>
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
                  <td className="schoolname">{school.schoolName}</td>
                  <td>{school.goldFirst}</td>
                  <td>{school.silverSecond}</td>
                  <td>{school.bronzeThird}</td>
                  <td>{school.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Row>
    </Container>
  );
};

export default PointsTable;
