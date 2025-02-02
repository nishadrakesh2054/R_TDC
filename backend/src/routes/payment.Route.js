// payment.Route.js

import crypto from "crypto";
import express from "express";
import Joi from "joi";
import sequelize from "../db/index.js";
import { sendRegistrationSuccessEmail } from "../middleware/sendRegistrationSuccessEmail.js";
import { Game, Participation, School } from "../models/init.Model.js";
import { createRegistrationPayment } from "../middleware/updateRegistrationPayment.js";

const router = express.Router();

// Validation schema using Joi (reuse from your other route)
const registrationSchema = Joi.object({
  schoolName: Joi.string().min(3).max(255).required(),
  contactNo: Joi.string().pattern(/^\d+$/).min(10).max(15).required().messages({
    "string.pattern.base":
      "Please provide a valid contact number (digits only).",
    "string.min": "Contact number must be at least 10 digits long.",
    "string.max": "Contact number must be at most 15 digits long.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
  }),
  type: Joi.string().valid("Individual", "Squad").required().messages({
    "any.only": "Please select a valid type (Individual or Squad).",
  }),
  game: Joi.number().required().messages({
    "number.base": "Please select a valid game.",
    "any.required": "Game ID is required.",
  }),
  numberOfParticipants: Joi.number()
    .min(1)
    .optional()
    .when("type", { is: "Individual", then: Joi.required() })
    .messages({
      "number.base": "Number of participants must be a number.",
      "number.min": "Number of participants must be at least 1.",
    }),
});

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
  //   console.log("Request Body:", req.body);
  const { pid, md, prn, amt, crn, dt, r1, r2, ru } = req.body;

  // Validate parameters
  const validationError = validatePaymentRequest(req);
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

router.post("/pre-check-registration", async (req, res) => {
  const preCheckSchema = Joi.object({
    schoolName: Joi.string().min(3).max(255).required(),
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
    game: Joi.number().required().messages({
      "number.base": "Please select a valid game.",
      "any.required": "Game ID is required.",
    }),
    numberOfParticipants: Joi.number().min(1).required().messages({
      "number.min": "Please provide at least 1 participant.",
      "any.required": "Number of participants is required.",
    }),
    type: Joi.string().valid("Squad", "Individual").required().messages({
      "any.only": "Please select a valid registration type.",
      "any.required": "Type of registration is required.",
    }),
  });

  const { error, value } = preCheckSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const { schoolName, contactNo, email, game, numberOfParticipants, type } =
    value;

  try {
    const transaction = await sequelize.transaction();

    const gameExists = await Game.findByPk(game, { transaction });
    if (!gameExists) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Selected game not found." });
    }

    const existingSchool = await School.findOne({
      where: {
        name: schoolName,
        email: email,
        contactNo: contactNo,
      },
      transaction,
    });

    if (existingSchool) {
      const existingParticipation = await Participation.findOne({
        where: { schoolId: existingSchool.id, gameId: game },
        transaction,
      });

      if (existingParticipation) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: "This school is already registered for the selected game.",
        });
      }
    }

    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Pre-registration checks passed.",
    });
  } catch (err) {
    console.error("Pre-registration check error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

router.post("/verify-payment", async (req, res) => {
  const { verificationString, dv, prn, paidAmount, formData, fee } = req.body;

  if (!verificationString || !dv || !prn || !paidAmount || !formData || !fee) {
    return res
      .status(400)
      .json({ verified: false, message: "Missing required parameters" });
  }

  const parsedPaidAmount = parseFloat(paidAmount);
  if (isNaN(parsedPaidAmount) || parsedPaidAmount <= 0) {
    return res.status(400).json({
      verified: false,
      message: "Paid amount must be a positive number",
    });
  }

  let SECRET_KEY =
    process.env.NODE_ENV === "development" ? "fonepay" : process.env.SECRET_KEY;
  const hmac = crypto.createHmac("sha512", SECRET_KEY);
  hmac.update(verificationString, "utf-8");
  const generatedHash = hmac.digest("hex");

  try {
    if (generatedHash.toLowerCase() !== dv.toLowerCase()) {
      return res.status(400).json({
        verified: false,
        message: "Payment verification failed: invalid hash.",
      });
    }

    const { error } = registrationSchema.validate(formData);
    if (error) {
      return res
        .status(400)
        .json({ verified: false, message: error.details[0].message });
    }

    const transaction = await sequelize.transaction();

    try {
      const { schoolName, contactNo, email, type, game, numberOfParticipants } =
        formData;

      const existingParticipation = await Participation.findOne({
        where: { PRN: prn },
        transaction,
      });
      if (existingParticipation) {
        await transaction.rollback();
        return res.status(400).json({
          verified: false,
          message: "Participation already exists for this PRN.",
        });
      }

      let [school, created] = await School.findOrCreate({
        where: { name: schoolName, email: email, contactNo: contactNo },
        defaults: {
          name: schoolName,
          email: email,
          contactNo: contactNo,
        },
        transaction,
      });

      const selectedGame = await Game.findByPk(Number(game), {
        transaction,
      });
      if (!selectedGame) {
        await transaction.rollback();
        return res.status(404).json({
          verified: false,
          message: "Selected game not found.",
        });
      }

      const existingSchoolGameParticipation = await Participation.findOne({
        where: { schoolId: school.id, gameId: selectedGame.id },
        transaction,
      });

      if (existingSchoolGameParticipation) {
        await transaction.rollback();
        return res.status(400).json({
          verified: false,
          message: "This school has already registered for this game.",
        });
      }

      const finalFee =
        type === "Individual"
          ? selectedGame.fee * numberOfParticipants
          : selectedGame.fee;

      //   if (parsedPaidAmount !== finalFee) {
      //     await transaction.rollback();
      //     return res.status(400).json({
      //       verified: false,
      //       message: "Paid amount does not match the calculated fee.",
      //     });
      //   }

      const participation = await Participation.create(
        {
          numberOfParticipants:
            type === "Individual" ? numberOfParticipants : null,
          paidAmount: parsedPaidAmount,
          fee: finalFee,
          paymentStatus: "SUCCESS",
          PRN: prn,
          schoolId: school.id,
          gameId: selectedGame.id,
        },
        { transaction }
      );

      await school.addGame(selectedGame, {
        through: participation,
        transaction,
      });

      await transaction.commit();

      await createRegistrationPayment(
        participation.id,
        prn,
        parsedPaidAmount,
        "SUCCESS"
      );

      res.status(200).json({
        verified: true,
        message: "Payment verified and registration successful.",
        details: {
          schoolName: school.name,
          gameName: selectedGame.name,
          prn: prn,
          paidAmount: parsedPaidAmount,
        },
      });

      // Send email asynchronously
      setImmediate(async () => {
        try {
          await sendRegistrationSuccessEmail(
            { locals: { school, participation } },
            res,
            () => {}
          );
          console.log("Registration email sent successfully");
        } catch (error) {
          console.error("Error sending registration email:", error);
        }
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Transaction error:", error);
      return res
        .status(500)
        .json({ verified: false, message: "Internal server error." });
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    return res
      .status(500)
      .json({ verified: false, message: "Internal server error." });
  }
});
export default router;
