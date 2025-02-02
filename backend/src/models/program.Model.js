import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Program = sequelize.define(
  "Program",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
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
    academyId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure this field is not null
      references: {
        model: "Academies", // Make sure this matches the Academy table name
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "programs",
  }
);

export default Program;
