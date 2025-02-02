import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const TableFixture = sequelize.define(
  "TableFixture",
  {
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    played: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    won: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    drawn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    GF: {
      type: DataTypes.INTEGER, // Goals For
      allowNull: false,
      defaultValue: 0,
    },
    GA: {
      type: DataTypes.INTEGER, // Goals Against
      allowNull: false,
      defaultValue: 0,
    },
    GD: {
      type: DataTypes.INTEGER, // Goal Difference
      allowNull: false,
      defaultValue: 0,
    },
    // points: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: 0,
    // },
    points: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.won * 3 + this.drawn * 1;
        },
      },
      
  },
  {
    tableName: "table_fixture",
    timestamps: false,
  }
);

export default TableFixture;
