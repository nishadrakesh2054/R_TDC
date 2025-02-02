import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Contact = sequelize.define(
  "Contact",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures firstName is not empty
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true, // Explicitly allow null if it's optional
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validates email format
      },
      // unique: true, // Uncomment if emails should be unique
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true, // Explicitly allow null if it's optional
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Sets a default value
    },
  },
  {
    timestamps: true,
    tableName: "contacts", // Use plural table name for consistency
  }
);

export default Contact;
