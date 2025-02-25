import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const PaymentTDC = sequelize.define("PaymentThunder", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Users", key: "id" },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "NPR",
  },
  transactionId: {
    type: DataTypes.STRING,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "success", "failed"),
    defaultValue: "pending",
  },
  paymentMethod: {
    type: DataTypes.STRING, // Example: 'fonepay', 'esewa', 'khalti'
  },
});

export default PaymentTDC;
