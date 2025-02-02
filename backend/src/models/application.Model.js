import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Application = sequelize.define(
	"Application",
	{
		applicantName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		resumeUrl: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		coverLetter: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		status: {
			type: DataTypes.ENUM(
				"pending",
				"reviewed",
				"interviewed",
				"accepted",
				"rejected"
			),
			defaultValue: "pending",
		},
		appliedDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		careerId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "careers",
				key: "id",
			},
		},
	},
	{
		timestamps: true,
		tableName: "applications",
	}
);

export default Application;
