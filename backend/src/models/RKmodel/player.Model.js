import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Team from "./team.Model.js";

const Player = sequelize.define(
  "Player",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    goalsScored: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    matchesPlayed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    position: {
      type: DataTypes.STRING, // E.g., "Goalkeeper", "Defender", "Midfielder", "Forward"
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING, // E.g., "Goalkeeper", "Defender", "Midfielder", "Forward"
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT, // Weight in kg
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT, // Height in cm
      allowNull: true,
    },
    player_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    teamId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Team,
        key: "team_name",
      },
    },
  },
  {
    tableName: "football_players",
    timestamps: true,
  }
);
Team.hasMany(Player, { foreignKey: "teamId", onDelete: "CASCADE" });
Player.belongsTo(Team, { foreignKey: "teamId" });

export default Player;
