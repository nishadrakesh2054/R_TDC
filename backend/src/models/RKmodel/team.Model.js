import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const Team = sequelize.define(
  "Team",
  {
    team_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    team_details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    team_logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bucket: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "football_teams",
    timestamps: true,
  }
);

export default Team;
