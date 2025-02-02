import express from "express";
import { School } from "../models/init.Model.js";


const router = express.Router();



// Get all schools
router.get("/schools", async (req, res) => {
  try {
    const schools = await School.findAll();
    res.status(200).json(schools);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;



  

