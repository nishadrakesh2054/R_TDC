import express from "express";
import { School, TDCSchool } from "../models/init.Model.js";
import Joi from "joi";

const router = express.Router();

// Create a new school
// router.post("/schools", async (req, res) => {
//   try {
//     const school = await School.create(req.body);
//     res.status(201).json(school);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

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



  

