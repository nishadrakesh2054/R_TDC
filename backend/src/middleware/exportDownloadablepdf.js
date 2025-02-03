import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define a function to create a safe path and check file existence
const createSafePath = (filename) => {
	const path = join(__dirname, "invitation", filename);
	if (!fs.existsSync(path)) {
		console.warn(`File not found: ${path}`);
		return null;
	}
	return path;
};

// Use createSafePath for all PDF paths
export const FOOTBALL_U_12_BOYS = createSafePath("FOOTBALL_U_12_BOYS.pdf");
export const FOOTBALL_U_16_BOYS = createSafePath("FOOTBALL_U_16_BOYS.pdf");

export const BASKETBALL_U_16_BOYS = createSafePath("BASKETBALL_U_16_BOYS.pdf");
export const BASKETBALL_U_18_BOYS = createSafePath("BASKETBALL_U_18_BOYS.pdf");
export const BASKETBALL_U_18_GIRLS = createSafePath(
	"BASKETBALL_U_18_GIRLS.pdf"
);
export const CHESS_U_14_BOYS = createSafePath("CHESS_U_14_BOYS.pdf");
export const CHESS_U_14_GIRLS = createSafePath("CHESS_U_14_GIRLS.pdf");
export const CHESS_U_18_BOYS = createSafePath("CHESS_U_18_BOYS.pdf");
export const CHESS_U_18_GIRLS = createSafePath("CHESS_U_18_GIRLS.pdf");
export const CRICKET_U_12_BOYS = createSafePath("CRICKET_U_12_BOYS.pdf");
export const CRICKET_U_16_BOYS = createSafePath("CRICKET_U_16_BOYS.pdf");
export const CRICKET_U_18_BOYS = createSafePath("CRICKET_U_18_BOYS.pdf");
export const FUTSAL_U_13_GIRLS = createSafePath("FUTSAL_U_13_GIRLS.pdf");
export const FUTSAL_U_18_BOYS = createSafePath("FUTSAL_U_18_BOYS.pdf");
export const FUTSAL_U_18_GIRLS = createSafePath("FUTSAL_U_18_GIRLS.pdf");
export const JUDO_BOYS = createSafePath("JUDO_BOYS.pdf");
export const JUDO_GIRLS = createSafePath("JUDO_GIRLS.pdf");
export const SWIMMING = createSafePath("SWIMMING.pdf");
export const TABLE_TENNIS_U_12_BOYS = createSafePath(
	"TABLE_TENNIS_U_12_BOYS.pdf"
);
export const TABLE_TENNIS_U_12_GIRLS = createSafePath(
	"TABLE_TENNIS_U_12_GIRLS.pdf"
);
export const TABLE_TENNIS_U_15_BOYS = createSafePath(
	"TABLE_TENNIS_U_15_BOYS.pdf"
);
export const TABLE_TENNIS_U_15_GIRLS = createSafePath(
	"TABLE_TENNIS_U_15_GIRLS.pdf"
);
export const TABLE_TENNIS_U_18_BOYS = createSafePath(
	"TABLE_TENNIS_U_18_BOYS.pdf"
);
export const TABLE_TENNIS_U_18_GIRLS = createSafePath(
	"TABLE_TENNIS_U_18_GIRLS.pdf"
);
export const TAEKWONDO_BOYS = createSafePath("TAEKWONDO_BOYS.pdf");
export const TAEKWONDO_GIRLS = createSafePath("TAEKWONDO_GIRLS.pdf");
export const VOLLEYBALL_U_18_BOYS = createSafePath("VOLLEYBALL_U_18_BOYS.pdf");
export const VOLLEYBALL_U_18_GIRLS = createSafePath(
	"VOLLEYBALL_U_18_GIRLS.pdf"
);
export const INVITATION = createSafePath("INVITATION.pdf");

export const TENNIS_U_18_BOYS = createSafePath("TENNIS_U_18_BOYS.pdf");
export const TENNIS_U_18_GIRLS = createSafePath("TENNIS_U_18_GIRLS.pdf");

export const ARCHERY_U_18_BOYS = createSafePath("ARCHERY_U_18_BOYS.pdf");
export const ARCHERY_U_18_GIRLS = createSafePath("ARCHERY_U_18_GIRLS.pdf");

// Export all attachments as an object for easy lookup
export const PDFAttachments = {
	FOOTBALL_U_12_BOYS,
	FOOTBALL_U_16_BOYS,
	
	BASKETBALL_U_16_BOYS,
	BASKETBALL_U_18_BOYS,
	BASKETBALL_U_18_GIRLS,

	CHESS_U_14_BOYS,
	CHESS_U_14_GIRLS,
	CHESS_U_18_BOYS,
	CHESS_U_18_GIRLS,

	CRICKET_U_12_BOYS,
	CRICKET_U_16_BOYS,
	CRICKET_U_18_BOYS,

	FUTSAL_U_13_GIRLS,
	FUTSAL_U_18_BOYS,
	FUTSAL_U_18_GIRLS,

	JUDO_BOYS,
	JUDO_GIRLS,

	SWIMMING,

	TABLE_TENNIS_U_12_BOYS,
	TABLE_TENNIS_U_12_GIRLS,
	TABLE_TENNIS_U_15_BOYS,
	TABLE_TENNIS_U_15_GIRLS,
	TABLE_TENNIS_U_18_BOYS,
	TABLE_TENNIS_U_18_GIRLS,

	TAEKWONDO_BOYS,
	TAEKWONDO_GIRLS,

	VOLLEYBALL_U_18_BOYS,
	VOLLEYBALL_U_18_GIRLS,

	INVITATION,

	TENNIS_U_18_GIRLS,
	TENNIS_U_18_BOYS,

	ARCHERY_U_18_GIRLS,
	ARCHERY_U_18_BOYS,
};
