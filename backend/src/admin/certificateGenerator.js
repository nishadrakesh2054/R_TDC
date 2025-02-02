import sharp from "sharp";
import xlsx from "xlsx";
import fs from "fs/promises";
import path from "path";

export async function generateCertificates(excelFilePath) {
	try {
		// Check if the Excel file exists
		await fs.access(excelFilePath);

		// Read Excel file
		const workbook = xlsx.readFile(excelFilePath);
		const sheet = workbook.Sheets[workbook.SheetNames[0]];
		const data = xlsx.utils.sheet_to_json(sheet);

		if (data.length === 0) {
			throw new Error("Excel file is empty or has no valid data.");
		}

		console.log("Excel data:", JSON.stringify(data, null, 2));

		// Create a directory for the generated overlays
		const outputDir = path.join(
			process.cwd(),
			"public",
			"generated_certificates"
		);
		await fs.mkdir(outputDir, { recursive: true });

		const generatedFiles = [];

		for (const row of data) {
			const { Name, Position } = row;

			if (!Name) {
				console.warn(`Skipping row due to missing Name`);
				continue;
			}

			// Create transparent PNG with the text for Appreciation Certificate
			const appreciationSvg = `
                <svg width="1030" height="2062">
                    <style>
                        .name { font: bold 28px 'Arial'; fill: black; }
                    </style>
                    <text x="270" y="1020" class="name">${Name}</text>
                </svg>
            `;

			const appreciationPngBuffer = await sharp({
				create: {
					width: 1030,
					height: 2062,
					channels: 4,
					background: { r: 0, g: 0, b: 0, alpha: 0 },
				},
			})
				.composite([
					{ input: Buffer.from(appreciationSvg), top: 0, left: 0 },
				])
				.png()
				.toBuffer();

			// Save the Appreciation Certificate overlay
			const appreciationOutputPath = path.join(
				outputDir,
				`${Name.replace(/\s+/g, "_")}_appreciation_${Date.now()}.png`
			);
			await fs.writeFile(appreciationOutputPath, appreciationPngBuffer);
			generatedFiles.push(appreciationOutputPath);

			// Create transparent PNG with the text for Achievement Certificate
			const achievementSvg = `
                <svg width="1030" height="2062">
                    <style>
                        .name { font: bold 28px 'Arial'; fill: black; }
                        .position { font: bold 24px 'Arial'; fill: black; }
                    </style>
                    <text x="270" y="1020" class="name">${Name}</text>
                    ${
						Position
							? `<text x="270" y="910" class="position">${Position}</text>`
							: ""
					}
                </svg>
            `;

			const achievementPngBuffer = await sharp({
				create: {
					width: 1030,
					height: 2062,
					channels: 4,
					background: { r: 0, g: 0, b: 0, alpha: 0 },
				},
			})
				.composite([
					{ input: Buffer.from(achievementSvg), top: 0, left: 0 },
				])
				.png()
				.toBuffer();

			// Save the Achievement Certificate overlay
			const achievementOutputPath = path.join(
				outputDir,
				`${Name.replace(/\s+/g, "_")}_achievement_${Date.now()}.png`
			);
			await fs.writeFile(achievementOutputPath, achievementPngBuffer);
			generatedFiles.push(achievementOutputPath);

			console.log(`Generated certificate overlays for ${Name}`);
		}

		return { outputDir, generatedFiles };
	} catch (error) {
		console.error("Error in generateCertificates:", error);
		throw new Error(`Certificate generation failed: ${error.message}`);
	}
}
