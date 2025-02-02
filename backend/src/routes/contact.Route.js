import express from "express";
import { Contact } from "../models/init.Model.js";
import Joi from "joi";
import { sendContactEmail } from "../middleware/emailService.js";

const router = express.Router();

// Define the validation schema
const contactSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().optional().allow(null, ""),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
  }),
  message: Joi.string().optional().allow(null, ""),
  // Do not include the "verified" field in the validation schema
});

// Get all category
router.get("/contacts-message", async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST request handler
router.post("/contacts", async (req, res) => {
  // Validate the request body
  const { error, value } = contactSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      details: error.details.map((detail) => detail.message),
    });
  }

  try {
    // Create a new contact
    const newContact = await Contact.create(value);

    // console.log(newContact.lastName);

    await sendContactEmail(
      newContact.firstName,
      newContact.lastName,
      newContact.email,
      newContact.message
    );

    res.status(201).json({
      status: "success",
      data: newContact,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      details: err.message,
    });
  }
});

export default router;
