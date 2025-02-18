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
    tableName: "football_fixture_date",
    timestamps: false,
  }
);
export default Fixture;
