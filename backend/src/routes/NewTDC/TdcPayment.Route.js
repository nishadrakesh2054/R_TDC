import express from "express";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import paymentTDC from "../../models/NewTdc/Payment.Model.js";
import Registration from "../../models/NewTdc/RegisterForm.Model.js";
import sequelize from "../../db/index.js";
import Joi from "joi";
import { sendPaymentConfirmationEmail } from "../../middleware/TDCMail/mailService.js";
const router = express.Router();

// Function to validate input parameters
const validatePaymentRequest = (req) => {
  const { pid, md, prn, amt, crn, dt, r1, r2, ru } = req.body;

  // Validate RU
  if (ru.length > 150)
    return "RU must be a string with a maximum length of 150.";

  // Validate PID
  if (pid.length < 3 || pid.length > 20)
    return "PID must be a string between 3 and 20 characters.";

  // Validate PRN
  if (prn.length < 3 || prn.length > 25)
    return "PRN must be a string between 3 and 25 characters.";

  // Validate AMT
  if (isNaN(amt) || amt.toString().length > 18)
    return "AMT must be a valid number with a maximum length of 18.";

  // Validate CRN
  if (crn !== "NPR" || crn.length !== 3) return "CRN must be exactly 'NPR'.";

  // Validate DT
  const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/; // MM/DD/YYYY format
  if (!datePattern.test(dt) || dt.length !== 10)
    return "DT must be a string in MM/DD/YYYY format and exactly 10 characters long.";

  // Validate R1
  if (r1.length > 160)
    return "R1 must be a string with a maximum length of 160.";

  // Validate R2
  if (r2.length > 50) return "R2 must be a string with a maximum length of 50.";

  // Validate MD
  if (md.length < 1 || md.length > 3)
    return "MD must be a string between 1 and 3 characters.";

  return null; // No validation errors
};

// Endpoint to generate HMAC-SHA512 hash
router.post("/generate-hash", (req, res) => {
  const { pid, md, prn, amt, crn, dt, r1, r2, ru } = req.body;

  // Validate parameters
  const validationError = validatePaymentRequest(req);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const dataString = `${pid},${md},${prn},${amt},${crn},${dt},${r1},${r2},${ru}`;

  let SECRET_KEY;

  if (process.env.NODE_ENV === "developments") {
    SECRET_KEY = "fonepay";
  } else {
    SECRET_KEY = process.env.SECRET_KEY;
  }

  const hmac = crypto.createHmac("sha512", SECRET_KEY);
  hmac.update(dataString, "utf-8");
  const dv = hmac.digest("hex");

  res.json({
    success: true,
    message: " (DV) generated successfully.",
    dv,
  });
});

// Endpoint to pre-check registration
router.post("/pre-check-registration", async (req, res) => {
  const preCheckSchema = Joi.object({
    fullName: Joi.string().min(3).max(255).required(),
    address: Joi.string().min(3).max(255).required(),
    contactNo: Joi.string()
      .pattern(/^\d+$/)
      .min(10)
      .max(15)
      .required()
      .messages({
        "string.pattern.base":
          "Please provide a valid contact number (digits only).",
        "string.min": "Contact number must be at least 10 digits long.",
        "string.max": "Contact number must be at most 15 digits long.",
      }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address.",
    }),
    dob: Joi.date().required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    schoolName: Joi.string().min(3).max(255).required(),
    parentName: Joi.string().min(3).max(255).required(),
    parentEmail: Joi.string().email().required(),
    parentContactNo: Joi.string()
      .pattern(/^\d+$/)
      .min(10)
      .max(15)
      .required()
      .messages({
        "string.pattern.base":
          "Please provide a valid contact number (digits only).",
        "string.min": "Contact number must be at least 10 digits long.",
        "string.max": "Contact number must be at most 15 digits long.",
      }),
    parentAddress: Joi.string().min(3).max(255).required(),
    sports: Joi.string().required(),
    time: Joi.string().required(),
    category: Joi.string().required(),
    emergencyContactname: Joi.string().min(3).max(255).required(),
    emergencyContactNumber: Joi.string()
      .pattern(/^\d+$/)
      .min(10)
      .max(15)
      .required()
      .messages({
        "string.pattern.base":
          "Please provide a valid contact number (digits only).",
        "string.min": "Contact number must be at least 10 digits long.",
        "string.max": "Contact number must be at most 15 digits long.",
      }),

    hasMedicalConditions: Joi.string().valid("yes", "no").required().messages({
      "any.required": "Please indicate if you have any medical conditions.",
      "any.only": "Please select 'yes' or 'no'.",
    }),
    medicalDetails: Joi.string().allow("").optional().messages({
      "string.base": "Medical details should be a string.",
      "string.empty": ", please provide medical details.",
    }),
    hasMedicalInsurance: Joi.string().valid("yes", "no").required().messages({
      "any.required": "Please indicate if you have medical insurance.",
      "any.only": "Please select 'yes' or 'no'.",
    }),
    insuranceNo: Joi.string().allow("").optional().messages({
      "string.base": "Insurance number should be a string.",
      "string.empty":
        "If you have medical insurance, please provide your insurance number.",
    }),
    transportation: Joi.string().valid("yes", "no").required().messages({
      "any.required": "Please specify if you need transportation.",
      "any.only": " Please select transportation 'yes' or 'no'.",
    }),
    amount: Joi.number().min(1).required().messages({
      "number.min": "Payment amount must be at least 1.",
    }),
    paymentMethod: Joi.string()
      .valid("fonepay", "esewa", "khalti")
      .required()
      .messages({
        "any.only": "Please select a valid payment method.",
      }),
    prn: Joi.string().optional(),
    notes: Joi.boolean().valid(true).required().messages({
      "any.only": "Please confirm the notes checkbox.",
      "boolean.base": "Notes must be a boolean value.",
    }),
    agreement: Joi.boolean().valid(true).required().messages({
      "any.only": "Please accept the agreement.",
      "boolean.base": "Agreement must be a boolean value.",
    }),
  });

  const { error, value } = preCheckSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const transaction = await sequelize.transaction();

  try {
    // Check if a registration already exists for this user
    const existingRegistration = await Registration.findOne({
      where: { email: value.email, contactNo: value.contactNo },
      transaction,
    });

    if (existingRegistration) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "You have already registered for an event.",
      });
    }

    const generatePRN = () => {
      return uuidv4().substring(0, 25);
    };
    const prn = generatePRN();
    console.log("Generated PRN during registration:", prn);

    // const newRegistration = await Registration.create(
    //   {
    //     ...value,
    //     prn,
    //   },
    //   { transaction }
    // );

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "Please proceed to payment for Registration",
    //   registrationId: newRegistration.id,
    //   prn: newRegistration.prn,
    prn: prn,
    });
  } catch (err) {
    await transaction.rollback();
    console.error("Pre-registration check error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

// router.post("/verify-payment", async (req, res) => {
//   const { PRN, PID, PS, RC, UID, BC, INI, P_AMT, R_AMT, DV } = req.body;

//   // Check if all required parameters are present
//   if (
//     !PRN ||
//     !PID ||
//     !PS ||
//     !RC ||
//     !UID ||
//     !BC ||
//     !INI ||
//     !P_AMT ||
//     !R_AMT ||
//     !DV
//   ) {
//     return res.status(400).json({
//       verified: false,
//       message: "Missing required parameters from backend",
//     });
//   }

//   const SECRET_KEY = "b83ec0267af644a89e7b7e9bf3fb16e0";

//   const verificationString = `${PRN},${PID},${PS},${RC},${UID},${BC},${INI},${P_AMT},${R_AMT}`;

//   // Debugging logs
//   console.log("Received PRN from frontend:", PRN);
//   const transaction = await sequelize.transaction();

//   try {
//     // Generate HMAC-SHA512 hash for verification
//     const hmac = crypto.createHmac("sha512", SECRET_KEY);
//     hmac.update(verificationString.trim(), "utf-8");
//     const generatedHash = hmac.digest("hex").toUpperCase();

//     // Compare the generated hash with the received DV
//     if (generatedHash !== DV.toUpperCase()) {
//       await transaction.rollback();
//       return res.status(400).json({
//         verified: false,
//         message: "Invalid verification. Hashes do not match.",
//       });
//     }




//     // Find the registration based on PRN
//     console.log("Searching for registration with PRN:", PRN);

//     const registration = await Registration.findOne({
//       where: { prn: PRN },
//       transaction,
//     });

//     // If registration not found, return error
//     if (!registration) {
//       await transaction.rollback();
//       console.error("Registration not found for PRN:", PRN);

//       return res.status(404).json({
//         verified: false,
//         message: "Registration not found.",
//       });
//     }

//     // Create a payment record if the verification is successful
//     const successfulPaymentRecord = await paymentTDC.create(
//       {
//         registrationId: registration.id,
//         transactionId: PRN,
//         amount: parseFloat(P_AMT),
//         status: "success",
//         paymentMethod: "fonepay",
//         paymentDate: new Date(),
//         email: registration.email,
//         fullName: registration.fullName,
//         sports: registration.sports,
//       },
//       { transaction }
//     );

//     await transaction.commit();

//     // Send payment confirmation email to the user
//     await sendPaymentConfirmationEmail(
//       registration.email,
//       registration.fullName,
//       parseFloat(P_AMT),
//       registration.contactNo,
//       registration.sports,
//       registration.category
//     );

//     res.status(200).json({
//       verified: true,
//       message: "Payment verified successfully.",
//       paymentDetails: {
//         id: successfulPaymentRecord.id,
//         status: "success",
//         amount: parseFloat(R_AMT),
//         paymentMethod: "fonepay",
//         fullName: registration.fullName,
//         sports: registration.sports,
//         category: registration.category,
//       },
//     });
//   } catch (error) {
//     // Rollback transaction in case of an error
//     await transaction.rollback();
//     console.error("Error during payment verification:", error);
//     return res
//       .status(500)
//       .json({ verified: false, message: "Internal server error." });
//   }
// });

router.post("/verify-payment", async (req, res) => {
    const { PRN, PID, PS, RC, UID, BC, INI, P_AMT, R_AMT, DV, formData } = req.body;
  
    // Check if all required parameters are present
    if (
      !PRN ||
      !PID ||
      !PS ||
      !RC ||
      !UID ||
      !BC ||
      !INI ||
      !P_AMT ||
      !R_AMT ||
      !DV ||
      !formData
    ) {
      return res.status(400).json({
        verified: false,
        message: "Missing required parameters from backend",
      });
    }
  
    // const SECRET_KEY = "b83ec0267af644a89e7b7e9bf3fb16e0";
  
    const verificationString = `${PRN},${PID},${PS},${RC},${UID},${BC},${INI},${P_AMT},${R_AMT}`;
  
    // Debugging logs
    console.log("Received PRN from frontend:", PRN);
    const transaction = await sequelize.transaction();
  
    try {
      // Generate HMAC-SHA512 hash for verification
      const hmac = crypto.createHmac("sha512", process.env.SECRET_KEY);
      hmac.update(verificationString.trim(), "utf-8");
      const generatedHash = hmac.digest("hex").toUpperCase();
  
      // Compare the generated hash with the received DV
      if (generatedHash !== DV.toUpperCase()) {
        await transaction.rollback();
        return res.status(400).json({
          verified: false,
          message: "Invalid verification. Hashes do not match.",
        });
      }
  
      // Save the form data to the database
      const newRegistration = await Registration.create(
        {
          ...formData,
          prn: PRN,
        },
        { transaction }
      );
  
      // Create a payment record
      const successfulPaymentRecord = await paymentTDC.create(
        {
          registrationId: newRegistration.id,
          transactionId: PRN,
          amount: parseFloat(P_AMT),
          status: "success",
          paymentMethod: "fonepay",
          paymentDate: new Date(),
          email: newRegistration.email,
          fullName: newRegistration.fullName,
          sports: newRegistration.sports,
          time: newRegistration.time,
          category: newRegistration.category,
        },
        { transaction }
      );
  
      await transaction.commit();
  
      // Send payment confirmation email to the user
      await sendPaymentConfirmationEmail(
        newRegistration.email,
        newRegistration.fullName,
        parseFloat(P_AMT),
        newRegistration.sports,
        newRegistration.category,
        newRegistration.time
      );
  
      res.status(200).json({
        verified: true,
        message: "Payment verified successfully.",
        paymentDetails: {
          id: successfulPaymentRecord.id,
          status: "success",
          amount: parseFloat(P_AMT),
          paymentMethod: "fonepay",
          fullName: newRegistration.fullName,
          sports: newRegistration.sports,
          category: newRegistration.category,
          time: newRegistration.time,
        },
      });
    } catch (error) {
      // Rollback transaction in case of an error
      await transaction.rollback();
      console.error("Error during payment verification:", error);
      return res
        .status(500)
        .json({ verified: false, message: "Internal server error." });
    }
  });

export default router;
