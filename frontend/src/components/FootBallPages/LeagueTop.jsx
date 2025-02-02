import React from 'react';
import './LeagueTop.scss'; 
import { Container } from 'react-bootstrap';

const LeagueTop = ({ title }) => {
  return (
    <div className="league-top-container">
    <Container>
    <h1 className="league-title">{title} </h1>
    </Container>
    </div>
  );
};

export default LeagueTop;
