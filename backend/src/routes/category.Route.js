import express from "express";
import { Category } from "../models/init.Model.js";

const router = express.Router();

// Get all category
router.get("/category", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
