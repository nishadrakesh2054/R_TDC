import { Model, DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import { Game, School, GameGroup } from "./init.Model.js";

class GamePointsTable extends Model {
	static resetAllStats = async function (gameId) {
		await this.update(
			{
				played: 0,
				won: 0,
				lost: 0,
				drawn: 0,
				points: 0,
				additionalStats: {},
			},
			{ where: { gameId: gameId } }
		);
	};
}

GamePointsTable.init(
	{
		schoolId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "Schools",
				key: "id",
			},
			validate: {
				notNull: { msg: "School ID is required" },
			},
		},
		gameId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "Games",
				key: "id",
			},
			validate: {
				notNull: { msg: "Game ID is required" },
			},
		},
		groupId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "GameGroup",
				key: "id",
			},
		},
		played: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				isInt: true,
				min: 0,
			},
		},
		won: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				isInt: true,
				min: 0,
			},
		},
		lost: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				isInt: true,
				min: 0,
			},
		},
		drawn: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				isInt: true,
				min: 0,
			},
		},
		points: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				isInt: true,
				min: 0,
			},
		},
		additionalStats: {
			type: DataTypes.JSON,
			allowNull: true,
			validate: {
				isValidJSON(value) {
					try {
						JSON.parse(JSON.stringify(value));
					} catch (error) {
						throw new Error(
							"Invalid JSON format for additionalStats"
						);
					}
				},
			},
		},
	},
	{
		sequelize,
		modelName: "GamePointsTable",
		tableName: "GamePointsTable",
		timestamps: true,
		indexes: [
			{
				unique: true,
				fields: ["schoolId", "gameId", "groupId"],
			},
		],
		scopes: {
			topPerformers: (limit = 5) => ({
				order: [["points", "DESC"]],
				limit: limit,
			}),
			byGame: (gameId) => ({
				where: { gameId: gameId },
			}),
			bySchool: (schoolId) => ({
				where: { schoolId: schoolId },
			}),
			byGroup: (groupId) => ({
				where: { groupId: groupId },
			}),
		},
		validate: {
			bothCoordsOrNone() {
				if (this.won + this.lost + this.drawn > this.played) {
					throw new Error(
						"Sum of won, lost, and drawn cannot exceed total played games"
					);
				}
			},
		},
		hooks: {
			beforeSave: (instance) => {
				// Example point calculation (adjust according to your rules)
				instance.points = instance.won * 3 + instance.drawn;
			},
		},
	}
);



// Instance methods
GamePointsTable.prototype.resetStats = async function () {
	this.played = 0;
	this.won = 0;
	this.lost = 0;
	this.drawn = 0;
	this.points = 0;
	this.additionalStats = {};
	await this.save();
};

GamePointsTable.prototype.updateAdditionalStats = async function (newStats) {
	this.additionalStats = { ...this.additionalStats, ...newStats };
	await this.save();
};

GamePointsTable.prototype.updateResult = async function (result) {
	this.played++;
	if (result === "win") this.won++;
	else if (result === "loss") this.lost++;
	else if (result === "draw") this.drawn++;
	await this.save();
};

export default GamePointsTable;
