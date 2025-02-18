import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const FootballManualRegistration = sequelize.define(
  "FootballManualRegistration",
  {
    paymentType: {
      type: DataTypes.ENUM("Cash", "QR"),
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
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
          msg: "Game fee must be a valid number.",
        },
        min: {
          args: [0],
          msg: "Game fee must be a positive number.",
        },
      },
    },
    noOfParticipants: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: "Number of participants must be an integer.",
        },
        min: {
          args: [1],
          msg: "There must be at least one participant.",
        },
      },
    },
    gameCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Game category cannot be empty.",
        },
        len: {
          args: [3, 255],
          msg: "Game category must be between 3 and 255 characters.",
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
    schoolEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please provide a valid email address.",
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
          msg: "Contact number must be between 10 and 15 digits.",
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
  }
);

export default FootballManualRegistration;
