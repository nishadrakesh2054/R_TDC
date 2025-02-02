import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const PointsTable = sequelize.define(
	"PointsTable",
	{
		schoolName: {
			type: DataTypes.STRING,
		},
		goldFirst: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		silverSecond: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		bronzeThird: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		totalPoints: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		position: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: true,
		hooks: {
			beforeSave: async (instance) => {
				instance.totalPoints =
					instance.goldFirst * 5 +
					instance.silverSecond * 3 +
					instance.bronzeThird * 1;
			},
			afterSave: async () => {
				await updatePositions();
			},
		},
	}
);

async function updatePositions() {
	const allEntries = await PointsTable.findAll({
		order: [["totalPoints", "DESC"]],
	});

	for (let i = 0; i < allEntries.length; i++) {
		await allEntries[i].update({ position: i + 1 });
	}
}

export default PointsTable;
