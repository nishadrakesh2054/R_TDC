import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const Registration = sequelize.define(
  "Registration",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentContactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sports: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContactname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hasMedicalConditions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicalDetails: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "registrations",
    timestamps: true,
  }
);

export default  Registration;
