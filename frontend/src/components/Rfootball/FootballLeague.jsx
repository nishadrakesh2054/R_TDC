import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import EventHeader from "../ReventHeader/EventHeader";
import "./footballleague.scss";
import Fixtures from "../FootBallPages/Fixtures.jsx";
import Home from "../FootBallPages/Home.jsx";
import Tables from "../FootBallPages/Tables.jsx";
import Results from "../FootBallPages/Result.jsx";
import Player from "../FootBallPages/Player.jsx";
import PlayerDetails from "../FootBallPages/PlayerDetails.jsx";

const FootballLeague = () => {
  return (
    <>
      <EventHeader />
      <div className="football-league-container">
        <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/results" element={<Results />} />
            <Route path="/players" element={<Player />} />
            <Route path="/players/:id" element={<PlayerDetails />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default FootballLeague;
