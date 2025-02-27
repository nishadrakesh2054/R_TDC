import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Registration from "../NewTdc/RegisterForm.Model.js";

const PaymentTDC = sequelize.define(
  "PaymentThunder",
  {
    registrationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Registration,
        key: "id",
      },
    },
    transactionId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false, // Ensures a transaction ID is always recorded
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "NPR",
    },
    status: {
      type: DataTypes.ENUM("pending", "success", "failed"),
      defaultValue: "pending",
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("fonepay", "esewa", "khalti"),
      allowNull: false, // Ensure payment method is always specified
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
  },
  {
    tableName: "PaymentThunder",
    freezeTableName: true, // Prevents Sequelize from making it plural
    timestamps: true,
  }
);

export default PaymentTDC;
