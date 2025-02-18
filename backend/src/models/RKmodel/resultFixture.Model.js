import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Fixture from "./dateFixtures.Model.js";

const ResultFixture = sequelize.define(
  "ResultFixture",
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
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING,
      allowNull: true,
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
    fixture_date: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Fixture,
        key: "date",
      },
    },
  },
  {
    tableName: "football_result",
    timestamps: false,
  }
);

// Define relationships
Fixture.hasMany(ResultFixture, { foreignKey: "fixture_date" });
ResultFixture.belongsTo(Fixture, { foreignKey: "fixture_date" });

export default ResultFixture;
