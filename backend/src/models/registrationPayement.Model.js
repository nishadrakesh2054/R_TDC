import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const RegistrationPayment = sequelize.define(
  "RegistrationPayment",
  {
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "SUCCESS", "ERROR"),
      allowNull: false,
    },
    prn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    participationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Participations",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);

// Define the association

export default RegistrationPayment;
