import { Model, DataTypes } from "sequelize";
import sequelize from "../db/index.js";

class GameGroup extends Model {}

GameGroup.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: "Group name cannot be empty" },
				len: [1, 50],
			},
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		gameId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "Games",
				key: "id",
			},
		},
	},
	{
		sequelize,
		modelName: "GameGroup",
		tableName: "GameGroup",
		timestamps: true,
		indexes: [
			{
				unique: true,
				fields: ["name", "gameId"],
			},
		],
	}
);

export default GameGroup;
