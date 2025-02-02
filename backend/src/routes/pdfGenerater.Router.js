import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/download-participations/:filename", (req, res) => {
	const { filename } = req.params;
	const filePath = path.join(__dirname, "..", "temp", filename);

	if (!fs.existsSync(filePath)) {
		return res.status(404).send("File not found");
	}

	res.download(filePath, (err) => {
		if (err) {
			console.error("Download error:", err);
			res.status(500).send("An error occurred during download");
		}
		// Optionally delete the file after download
		fs.unlink(filePath, (unlinkErr) => {
			if (unlinkErr) console.error("Error deleting file:", unlinkErr);
		});
	});
});

// Updated download-certificates route
router.get("/download-certificates/:filename", (req, res) => {
	const { filename } = req.params;
	console.log("Requested filename:", filename);

	// Adjust this path to point to the correct location
	const filePath = path.join(
		process.cwd(), // This should point to the root of your project
		"public",
		"generated_certificates",
		filename
	);

	console.log("Attempting to access file at:", filePath);

	if (!fs.existsSync(filePath)) {
		console.error(`File not found: ${filePath}`);
		return res.status(404).send("File not found");
	}

	res.download(filePath, (err) => {
		if (err) {
			console.error("Download error:", err);
			return res.status(500).send("An error occurred during download");
		}

		// Delete the file after successful download
		fs.unlink(filePath, (unlinkErr) => {
			if (unlinkErr) {
				console.error("Error deleting file:", unlinkErr);
			} else {
				console.log(`File deleted successfully: ${filePath}`);
			}
		});
	});
});

export default router;
