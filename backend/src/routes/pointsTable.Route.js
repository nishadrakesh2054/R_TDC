import express from "express";
import { PointsTable } from "../models/init.Model.js";
const router = express.Router();

router.get("/points-table", async (req, res) => {
  try {
    // Fetch top 10 entries based on position.
    const pointsTable = await PointsTable.findAll({
      limit: 10, // Only get the top 10
      order: [["position", "ASC"]], // Order by position
    });

    res.status(200).json(pointsTable);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
