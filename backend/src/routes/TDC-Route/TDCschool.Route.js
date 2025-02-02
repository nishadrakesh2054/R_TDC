import express from "express";
import { TDCSchool } from "../../models/init.Model";


const router = express.Router();

router.get("/tdc-schools", async (req, res) => {
  try {
    const schools = await TDCSchool.findAll();
    res.status(200).json(schools);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
