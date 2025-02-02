// models/TDCschool.Model.js

import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const TDCSchool = sequelize.define(
	"TDCSchool",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "TDCschool name cannot be empty.",
				},
				len: {
					args: [3, 255],
					msg: "TDCschool name must be between 3 and 255 characters.",
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					msg: "Please provide a valid email address.",
				},
				notEmpty: {
					msg: "Email address cannot be empty.",
				},
			},
		},
		contactNo: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Contact number cannot be empty.",
				},
				isNumeric: {
					msg: "Contact number must contain only numeric characters.",
				},
				len: {
					args: [10, 15],
					msg: "Contact number must be between 10 and 15 digits long.",
				},
			},
		},
	},
	{
		timestamps: true,
		indexes: [
			{
				unique: true,
				fields: ["name", "email", "contactNo"],
			},
		],
	}
);

export default TDCSchool;
