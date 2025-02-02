import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Certificate = sequelize.define(
	"Certificate",
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		excelFile: {
			type: DataTypes.STRING,
		},

		excelFileKey: {
			type: DataTypes.STRING,
		},
		bucket: {
			type: DataTypes.STRING,
		},
		mime: {
			type: DataTypes.STRING,
		},
		generatedCertificates: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: true,
		tableName: "Certificate",
	}
);

export default Certificate;
