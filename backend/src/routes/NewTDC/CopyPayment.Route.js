import express from "express";
import crypto from "crypto";
import paymentTDC from "../../models/NewTdc/Payment.Model.js";
import Registration from "../../models/NewTdc/RegisterForm.Model.js";
import sequelize from "../../db/index.js";
import Joi from "joi";
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
    console.log("Request Body:", req.body);
  const { pid, md, prn, amt, crn, dt, r1, r2, ru } = req.body;

  // Validate parameters
  const validationError = validatePaymentRequest({
    pid, md, prn, amt, crn, dt, r1, r2, ru,
  });
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const dataString = `${pid},${md},${prn},${amt},${crn},${dt},${r1},${r2},${ru}`;

  let SECRET_KEY;

  if (process.env.NODE_ENV === "development") {
    SECRET_KEY = "fonepay";
  } else {
    SECRET_KEY = process.env.SECRET_KEY;
  }

  // Generate HMAC-SHA512 hash (DV)
  const hmac = crypto.createHmac("sha512", SECRET_KEY);
  hmac.update(dataString, "utf-8");
  const dv = hmac.digest("hex");

  res.json({ dv });
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
    parentContactNo: Joi.string().pattern(/^\d+$/).min(10).max(15).required(),
    parentAddress: Joi.string().min(3).max(255).required(),
    sports: Joi.string().required(),
    category: Joi.string().required(),
    emergencyContactname: Joi.string().min(3).max(255).required(),
    emergencyContactNumber: Joi.string()
      .pattern(/^\d+$/)
      .min(10)
      .max(15)
      .required(),
    hasMedicalConditions: Joi.string().required(),
    medicalDetails: Joi.string().allow("").optional(),
    amount: Joi.number().min(1).required().messages({
      "number.min": "Payment amount must be at least 1.",
    }),
    paymentMethod: Joi.string()
      .valid("fonepay", "esewa", "khalti")
      .required()
      .messages({
        "any.only": "Please select a valid payment method.",
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

    // Create a new registration
    const newRegistration = await Registration.create(value, { transaction });

    // Create a pending payment entry
    const newPayment = await paymentTDC.create(
      {
        registrationId: newRegistration.id,
        transactionId: `TXN_${Date.now()}`, // Dummy transaction ID (replace with actual)
        amount: value.amount,
        paymentMethod: value.paymentMethod,
        status: "pending",
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(201).json({
      success: true,
      message: "Registration successful. Proceed to payment.",
      registrationId: newRegistration.id,
      paymentId: newPayment.id,
    });
  } catch (err) {
    await transaction.rollback();
    console.error("Pre-registration check error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

// Endpoint to verify payment
router.post("/verify-payment", async (req, res) => {
  const { verificationString, dv, prn, paidAmount, paymentMethod } = req.body;

  if (!verificationString || !dv || !prn || !paidAmount || !paymentMethod) {
    return res
      .status(400)
      .json({ verified: false, message: "Missing required parameters" });
  }

  const parsedPaidAmount = parseFloat(paidAmount);
  if (isNaN(parsedPaidAmount) || parsedPaidAmount <= 0) {
    return res
      .status(400)
      .json({ verified: false, message: "Invalid paid amount" });
  }

  const SECRET_KEY =
    process.env.NODE_ENV === "development" ? "fonepay" : process.env.SECRET_KEY;
  const hmac = crypto.createHmac("sha512", SECRET_KEY);
  hmac.update(verificationString, "utf-8");
  const generatedHash = hmac.digest("hex");

  if (generatedHash.toLowerCase() !== dv.toLowerCase()) {
    return res.status(400).json({
      verified: false,
      message: "Payment verification failed: invalid hash.",
    });
  }

  try {
    const transaction = await sequelize.transaction();

    // Find the registration
    const registration = await Registration.findByPk(prn, { transaction });
    if (!registration) {
      await transaction.rollback();
      return res.status(404).json({
        verified: false,
        message: "Registration not found.",
      });
    }

    // Create a payment record
    const paymentRecord = await paymentTDC.create(
      {
        registrationId: prn,
        transactionId: verificationString,
        amount: parsedPaidAmount,
        status: "success",
        paymentMethod,
        paymentDate: new Date(),
      },
      { transaction }
    );

    await transaction.commit();
    res.status(200).json({
      verified: true,
      message: "Payment verified successfully.",
      details: paymentRecord,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error during payment verification:", error);
    return res
      .status(500)
      .json({ verified: false, message: "Internal server error." });
  }
});
export default router;
