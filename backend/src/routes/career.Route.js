import express from "express";
import { Career, Application } from "../models/init.Model.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { ValidationError } from "sequelize";

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDir = path.join(process.cwd(), "public", "uploads");
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname +
				"-" +
				uniqueSuffix +
				path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage });

// GET all careers
router.get("/career", async (req, res) => {
	try {
		const careers = await Career.findAll({
			where: { active: true },
			attributes: ["id", "title", "salary_range"],
		});
		res.json(careers);
	} catch (error) {
		console.error("Error fetching careers:", error);
		res.status(500).json({
			message: "Failed to fetch careers",
			error: error.message,
		});
	}
});

// GET a single career by ID
router.get("/career/:id", async (req, res) => {
	try {
		const career = await Career.findOne({
			where: { id: req.params.id, active: true },
		});

		if (!career) {
			return res.status(404).json({ message: "Career not found" });
		}

		res.json(career);
	} catch (error) {
		console.error("Error fetching career:", error);
		res.status(500).json({
			message: "Failed to fetch career",
			error: error.message,
		});
	}
});

// POST route to submit an application
router.post("/application", upload.single("resume"), async (req, res) => {
	try {
		const { applicantName, email, phone, coverLetter, careerId } = req.body;

		// Validate required fields
		if (!applicantName || !email || !careerId) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: "Invalid email format" });
		}

		const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

		const application = await Application.create({
			applicantName,
			email,
			phone,
			resumeUrl,
			coverLetter,
			careerId: parseInt(careerId, 10), // Ensure careerId is an integer
		});

		res.status(201).json({
			message: "Application submitted successfully",
			application,
		});
	} catch (error) {
		console.error("Error submitting application:", error);
		if (error instanceof ValidationError) {
			// Handle Sequelize validation errors
			const validationErrors = error.errors.map((err) => ({
				field: err.path,
				message: err.message,
			}));
			res.status(400).json({
				message: "Validation error",
				errors: validationErrors,
			});
		} else if (error instanceof multer.MulterError) {
			// Handle Multer errors
			res.status(400).json({
				message: "File upload error",
				error: error.message,
			});
		} else {
			res.status(500).json({
				message: "Failed to submit application",
				error: error.message,
			});
		}
	}
});

export default router;
