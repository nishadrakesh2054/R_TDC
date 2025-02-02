import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Academy = sequelize.define(
  "Academy",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "Academies",
    timestamps: true,
  }
);

export default Academy;
