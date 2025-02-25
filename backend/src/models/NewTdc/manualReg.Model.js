import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const ManualReg = sequelize.define("ManualReg", {
  paymentType: {
    type: DataTypes.ENUM("Cash", "QR"),
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: {
        msg: "Total amount must be a valid number.",
      },
      min: {
        args: [0],
        msg: "Total amount must be a positive number.",
      },
    },
  },
  gameFee: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: {
        msg: "Fee must be a valid number.",
      },
      min: {
        args: [0],
        msg: "Fee must be a positive number.",
      },
    },
  },
  emergencyContactPersonName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emergencyContactPersonNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  gameCategory: {
    type: DataTypes.ENUM("Grassroots (6-11 years)", "Intermediate (12-15 years)", "Senior (16-19 years)"),
    allowNull: false,
  },
  sportsName: {
    type: DataTypes.ENUM("Football", "Futsal", "Cricket","Swimming","Tennis"),
    allowNull: false,
  },

  parentAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
  
      notEmpty: {
        msg: " address cannot be empty.",
      },
    },
  },
  parentContactNo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Parent contact number cannot be empty.",
      },
    },
  },
  parentEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Please provide a valid parent email address.",
      },
      notEmpty: {
        msg: "Parent email address cannot be empty.",
      },
    },
  },
  parentName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Parent name cannot be empty.",
      },
    },
  },
  schoolName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "School name cannot be empty.",
      },
      len: {
        args: [3, 255],
        msg: "School name must be between 3 and 255 characters.",
      },
    },
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female", "Other"),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [5],
        msg: "Age must be at least 5 years old.",
      },
    },
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: "Please provide a valid date of birth.",
      },
    },
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Please provide a valid email address.",
      },
      notEmpty: {
        msg: "Email address cannot be empty.",
      },
    },
  },
  ContactNo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "  ContactNo cannot be empty.",
      },
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: " address cannot be empty.",
      },
    },
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: " Name cannot be empty.",
      },
    },
  },
});

export default ManualReg;
