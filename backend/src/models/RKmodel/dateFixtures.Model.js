import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const Fixture = sequelize.define(
  "Fixture",
  {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "fixture Date",
    timestamps: false,
  }
);
export default Fixture;
