import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const AgeGroup = sequelize.define(
  "AgeGroup",
  {
    ageGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    imageKey: {
      type: DataTypes.STRING,
    },
    bucket: {
      type: DataTypes.STRING,
    },
    mime: {
      type: DataTypes.STRING,
    },
    programId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure this field is not null
      references: {
        model: "programs", // Ensure it matches the Program table name
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "ageGroups",
  }
);

export default AgeGroup;
