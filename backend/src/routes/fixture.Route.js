import express from "express";

const router = express.Router();

import Fixture from "../models/RKmodel/dateFixtures.Model.js";
import GameFixture from "../models/RKmodel/gameFixture.Model.js";
import ResultFixture from "../models/RKmodel/resultFixture.Model.js";
import TableFixture from "../models/RKmodel/tableFixture.Model.js";
import Player from "../models/RKmodelDetails/player.Model.js";
import Team from "../models/RKmodelDetails/team.Model.js";

const baseURL = "http://localhost:3000/uploads/";

router.get("/fixtures", async (req, res) => {
  try {
    // Fetch all fixtures with associated matches
    const gameFixtures = await GameFixture.findAll({
      include: {
        model: Fixture,
        attributes: ["date"], // Include only the date attribute
      },
    });

    // Group matches by date
    const groupedFixtures = gameFixtures.reduce((acc, match) => {
      const date = match.Fixture.date;
      if (!acc[date]) {
        acc[date] = { date, matches: [] };
      }

      // Construct image URLs based on the folder structure
      const image1URL = match.imageKey1 ? `${baseURL}${match.imageKey1}` : null;
      const image2URL = match.imageKey2 ? `${baseURL}${match.imageKey2}` : null;

      acc[date].matches.push({
        id: match.id,
        team1: match.team_1,
        team2: match.team_2,
        time: match.time,
        location: match.location,
        image1: image1URL,
        image2: image2URL,
      });
      return acc;
    }, {});

    // Convert grouped object to array
    const fixtures = Object.values(groupedFixtures);

    res.status(200).json({
      fixtures,
      message: "All fixtures fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    res.status(500).json({ error: "Failed to fetch fixtures" });
  }
});

router.get("/results", async (req, res) => {
  try {
    const results = await ResultFixture.findAll({
      include: {
        model: Fixture,
        attributes: ["date"], // Include only the date attribute
      },
    });

    // Format results into a consistent structure
    const formattedResults = results.map((result) => ({
      id: result.id,
      team1: result.team_1,
      team2: result.team_2,
      score: result.score,
      time: result.time,
      location: result.location,
      date: result.Fixture?.date || null,
      image1: result.imageKey1 ? `${baseURL}${result.imageKey1}` : null,
      image2: result.imageKey2 ? `${baseURL}${result.imageKey2}` : null,
    }));

    res.status(200).json({
      results: formattedResults,
      message: "All results fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

router.get("/tables", async (req, res) => {
  try {
    const tables = await TableFixture.findAll();
    res.status(200).json({ success: true, tables });
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/players", async (req, res) => {
  try {
    const players = await Player.findAll({
      include: [
        {
          model: Team,
          attributes: ["team_name", "team_logo", "team_details"],
        },
      ],
    });

    const formattedPlayers = players.map((player) => ({
      id: player.id,
      player_name: player.player_name,
      position: player.position,
      address: player.address,
      age: player.age,
      weight: player.weight,
      height: player.height,
      goalsScored: player.goalsScored,
      matchesPlayed: player.matchesPlayed,
      player_image: player.imageKey
        ? `${baseURL}${player.imageKey}` 
        : null,
      teamId: player.teamId,

      team: {
        team_name: player.Team.team_name,
        team_logo: player.Team.team_logo
          ? `${baseURL}${player.Team.team_logo}`
          : null,
        team_details: player.Team.team_details,
      },
    }));

    res.status(200).json({
      success: true,
      players: formattedPlayers,
    });
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching players.",
    });
  }
});

router.get("/teams", async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: Player,
          attributes: [
            "id",
            "player_name",
            "position",
            "age",
            "height",
            "weight",
            "goalsScored",
            "matchesPlayed",
            "player_image",
          ],
        },
      ],
    });

    const formattedTeams = teams.map((team) => ({
      team_name: team.team_name,
      team_details: team.team_details,
      team_logo: team.imageKey ? `${baseURL}${team.imageKey}` : null,
      players: team.Players.map((player) => ({
        id: player.id,
        player_name: player.player_name,
        position: player.position,
        age: player.age,
        height: player.height,
        weight: player.weight,
        goalsScored: player.goalsScored,
        matchesPlayed: player.matchesPlayed,
           player_image: player.imageKey
        ? `${baseURL}${player.imageKey}` 
        : null,
      })),
    }));

    res.status(200).json({
      success: true,
      teams: formattedTeams,
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching teams.",
    });
  }
});

export default router;
