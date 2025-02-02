import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Career = sequelize.define(
	"Career",
	{
		title: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		salary_range: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		timestamps: true,
		tableName: "careers",
	}
);

export default Career;
