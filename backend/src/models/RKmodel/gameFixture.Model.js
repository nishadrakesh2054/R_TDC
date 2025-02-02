

import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Fixture from "./dateFixtures.Model.js";

const GameFixture = sequelize.define(
  "GameFixture",
  {
    imageKey1: {
      type: DataTypes.STRING,
    },
    bucket1: {
      type: DataTypes.STRING,
    },
    mime1: {
      type: DataTypes.STRING,
    },

    imageKey2: {
      type: DataTypes.STRING,
    },
    bucket2: {
      type: DataTypes.STRING,
    },
    mime2: {
      type: DataTypes.STRING,
    },
    fixture_date: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Fixture,
        key: "date",
      },
    },

    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image2: {
      type: DataTypes.STRING,
    },
    team_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image1: {
      type: DataTypes.STRING,
    },
    team_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "games_fixture",
    timestamps: false,
  }
);

Fixture.hasMany(GameFixture, { foreignKey: "fixture_date" });
GameFixture.belongsTo(Fixture, { foreignKey: "fixture_date" });

export default GameFixture;
