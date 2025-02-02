import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const TDCGame = sequelize.define(
	"TDCGame",
	{
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Game name cannot be empty.",
				},
				len: {
					args: [3, 255],
					msg: "Game name must be between 3 and 255 characters.",
				},
			},
		},
		type: {
			type: DataTypes.ENUM("Individual", "Squad"),
			allowNull: false,
			validate: {
				isIn: {
					args: [["Individual", "Squad"]],
					msg: "Game type must be either 'Individual' or 'Squad'.",
				},
			},
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Category cannot be empty.",
				},
				len: {
					args: [3, 255],
					msg: "Category must be between 3 and 255 characters.",
				},
			},
		},
		fee: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				isFloat: {
					msg: "Fee must be a valid number.",
				},
				min: {
					args: [0],
					msg: "Fee must be a positive number.",
				},
			},
		},
	},
	{
		// Model options
		tableName: "TDCGames",
		timestamps: true, 
	}
);

export default TDCGame;
