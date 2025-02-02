import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category name cannot be empty.",
        },
        len: {
          args: [3, 255],
          msg: "Category name must be between 3 and 255 characters.",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Category;
