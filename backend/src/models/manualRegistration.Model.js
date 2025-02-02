import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const ManualRegistration = sequelize.define("ManualRegistration", {
	paymentType: {
		type: DataTypes.ENUM("Cash", "QR"), // Changed 'types' to 'type'
		allowNull: false, // Assuming paymentType should not be null
	},
	totalAmount: {
		type: DataTypes.FLOAT, // Changed 'types' to 'type' and considered a numeric type
		allowNull: false,
		validate: {
			isFloat: {
				msg: "Total amount must be a valid number.",
			},
			min: {
				args: [0],
				msg: "Total amount must be a positive number.",
			},
		},
	},

	gameFee: {
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
	noOfParticipants: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	gameCategory: {
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
	gameName: {
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
	gameType: {
		type: DataTypes.ENUM("Individual", "Squad"),
		allowNull: false,
		validate: {
			isIn: {
				args: [["Individual", "Squad"]],
				msg: "Game type must be either 'Individual' or 'Squad'.",
			},
		},
	},
	schoolEmail: {
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
	schoolContactNo: {
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
	schoolName: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "School name cannot be empty.",
			},
			len: {
				args: [3, 255],
				msg: "School name must be between 3 and 255 characters.",
			},
		},
	},
});

ManualRegistration.beforeSave((registration, options) => {
	if (registration.gameType === "Individual") {
		registration.totalAmount =
			registration.gameFee * (registration.noOfParticipants || 1);
	} else {
		registration.totalAmount = registration.gameFee;
	}
});

export default ManualRegistration;
