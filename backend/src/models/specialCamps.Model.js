import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const SpecialCamps = sequelize.define(
  "SpecialCamps",
  {
    title: {
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
  },
  {
    timestamps: true,
    tableName: "SpecialCamps",
  }
);

export default SpecialCamps;
