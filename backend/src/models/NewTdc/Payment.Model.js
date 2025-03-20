import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Registration from "../NewTdc/RegisterForm.Model.js";

const PaymentTDC = sequelize.define(
  "PaymentThunder",
  {
    registrationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Registration,
        key: "id",
      },
    },
    transactionId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sports: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // new added
    time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "PaymentThunder",
    freezeTableName: true,
    timestamps: true,
  }
);

export default PaymentTDC;
