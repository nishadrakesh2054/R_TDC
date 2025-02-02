// models/participation.Model.js

import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Participation = sequelize.define(
  "Participation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    numberOfParticipants: {
      type: DataTypes.INTEGER,
      allowNull: true, // Only required for Individual type games
      validate: {
        min: {
          args: [1],
          msg: "Number of participants must be at least 1.",
        },
        isInt: {
          msg: "Number of participants must be an integer.",
        },
      },
    },
    paidAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: "Paid amount must be a valid number.",
        },
        min: {
          args: [0],
          msg: "Paid amount must be a positive number.",
        },
      },
    },
    paymentStatus: {
      type: DataTypes.ENUM("SUCCESS", "PENDING", "FAILED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    PRN: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure PRN is unique for each transaction
      validate: {
        notEmpty: {
          msg: "PRN cannot be empty.",
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
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Schools",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      validate: {
        notNull: {
          msg: "School ID is required.",
        },
        isInt: {
          msg: "School ID must be an integer.",
        },
      },
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Games",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      validate: {
        notNull: {
          msg: "Game ID is required.",
        },
        isInt: {
          msg: "Game ID must be an integer.",
        },
      },
    },
  },
  {
    tableName: "Participations",
    timestamps: true, // Enable timestamps for createdAt and updatedAt
    validate: {
      participantsRequired() {
        if (this.gameId) {
          // Fetch the associated game to determine its type
          return sequelize.models.Game.findByPk(this.gameId).then((game) => {
            if (
              game &&
              game.type === "Individual" &&
              !this.numberOfParticipants
            ) {
              throw new Error(
                "Number of participants is required for Individual type games."
              );
            }
          });
        }
      },
    },
  }
);

export default Participation;
