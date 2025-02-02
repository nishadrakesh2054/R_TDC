import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Op } from "sequelize";
import { Participation, Game, School } from "../models/init.Model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generatePDF = async (startDate, endDate) => {
	try {
		const participations = await Participation.findAll({
			where: {
				createdAt: {
					[Op.between]: [startDate, endDate],
				},
			},
			include: [Game, School],
		});

		console.log("Participations found:", participations.length);
		if (participations.length > 0) {
			console.log(
				"Sample participation:",
				JSON.stringify(participations[0], null, 2)
			);
		}

		const doc = new PDFDocument({ margin: 50, size: "A4" });
		const pdfFileName = `participations_${Date.now()}.pdf`;
		const pdfPath = path.join(__dirname, "..", "temp", pdfFileName);

		const tempDir = path.join(__dirname, "..", "temp");
		if (!fs.existsSync(tempDir)) {
			fs.mkdirSync(tempDir, { recursive: true });
		}

		const stream = fs.createWriteStream(pdfPath);
		doc.pipe(stream);

		// Add title
		doc.font("Helvetica-Bold")
			.fontSize(18)
			.text("Participation Report", { align: "center" });
		doc.moveDown(0.5);

		// Add date range
		doc.font("Helvetica")
			.fontSize(12)
			.text(
				`Date Range: ${new Date(
					startDate
				).toLocaleDateString()} - ${new Date(
					endDate
				).toLocaleDateString()}`,
				{ align: "center" }
			);
		doc.moveDown(1);

		const columns = [
			{ header: "SN", width: 30 },
			{ header: "PID", width: 40 },
			{ header: "PRN", width: 80 },
			{ header: "School Name", width: 100 },
			{ header: "Game", width: 70 },
			{ header: "Category", width: 70 },
			{ header: "Amount", width: 60 },
			{ header: "Date", width: 70 },
		];

		// Draw table header
		let y = doc.y;
		doc.font("Helvetica-Bold").fontSize(10);
		columns.forEach((column, i) => {
			doc.text(
				column.header,
				50 +
					columns
						.slice(0, i)
						.reduce((sum, col) => sum + col.width, 0),
				y,
				{ width: column.width, align: "left" }
			);
		});

		// Draw a line under the header
		doc.moveTo(50, y + 15)
			.lineTo(550, y + 15)
			.stroke();
		y += 20;

		// Draw table rows
		doc.font("Helvetica").fontSize(9).lineGap(4);
		participations.forEach((participation, index) => {
			if (y > 750) {
				doc.addPage();
				y = 50;
				// Redraw the header on the new page
				doc.font("Helvetica-Bold").fontSize(10);
				columns.forEach((column, i) => {
					doc.text(
						column.header,
						50 +
							columns
								.slice(0, i)
								.reduce((sum, col) => sum + col.width, 0),
						y,
						{ width: column.width, align: "left" }
					);
				});
				doc.moveTo(50, y + 15)
					.lineTo(550, y + 15)
					.stroke();
				y += 20;
				doc.font("Helvetica").fontSize(9).lineGap(4);
			}

			try {
				let x = 50;
				doc.text((index + 1).toString(), x, y, {
					width: 30,
					align: "left",
				});
				x += 30;
				doc.text(participation.id?.toString() || "N/A", x, y, {
					width: 40,
					align: "left",
				});
				x += 40;
				doc.text(participation.PRN?.toString() || "N/A", x, y, {
					width: 80,
					align: "left",
				});
				x += 80;
				doc.text(participation.School?.name || "N/A", x, y, {
					width: 100,
					align: "left",
				});
				x += 100;
				doc.text(participation.Game?.name || "N/A", x, y, {
					width: 70,
					align: "left",
				});
				x += 70;
				doc.text(participation.Game?.category || "N/A", x, y, {
					width: 70,
					align: "left",
				});
				x += 70;
				doc.text(
					participation.paidAmount
						? `NPR ${participation.paidAmount.toFixed(2)}`
						: "N/A",
					x,
					y,
					{ width: 60, align: "right" }
				);
				x += 60;
				doc.text(
					participation.createdAt
						? new Date(participation.createdAt).toLocaleDateString()
						: "N/A",
					x,
					y,
					{ width: 70, align: "left" }
				);
			} catch (error) {
				console.error("Error processing participation:", error);
				console.error(
					"Problematic participation:",
					JSON.stringify(participation, null, 2)
				);
			}

			y += 20;
		});

		// Add page numbers
		const pageCount = doc.bufferedPageRange().count;
		for (let i = 0; i < pageCount; i++) {
			doc.switchToPage(i);
			doc.text(`Page ${i + 1} of ${pageCount}`, 50, 800, {
				align: "center",
			});
		}

		return new Promise((resolve, reject) => {
			doc.end();
			stream.on("finish", () => {
				resolve(pdfFileName);
			});
			stream.on("error", reject);
		});
	} catch (error) {
		console.error("Error generating PDF:", error);
		throw error;
	}
};
