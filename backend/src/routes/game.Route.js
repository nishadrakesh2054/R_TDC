import express from "express";
import { Game } from "../models/init.Model.js";

const router = express.Router();

// routes/api.js or wherever your API is defined
router.get("/games", async (req, res) => {
  try {
    const games = await Game.findAll({ where: { active: true } });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Error fetching games" });
  }
});

router.get("/games/type/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const games = await Game.findAll({ where: { type, active: true } });
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
