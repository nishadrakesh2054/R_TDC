import express from "express";
import { Partners } from "../models/init.Model.js";
import Joi from "joi";

const router = express.Router();

// Joi validation schema for creating a new Partner
const createPartnerSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  image: Joi.string().uri().required(),
  link: Joi.string().uri().required(),
  active: Joi.boolean().required(),
});

// Joi validation schema for updating a Partner
const updatePartnerSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  image: Joi.string().uri(),
  link: Joi.string().uri(),
  active: Joi.boolean(),
});

// Fetch all active Partners items
router.get("/active-partners", async (req, res) => {
  try {
    const partners = await Partners.findAll({
      where: { active: true },
    });
    if (partners.length > 0) {
      res.status(200).json(partners);
    } else {
      res.status(404).json({ message: "No active Partners items found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while retrieving active Partners items",
      error: err.message,
    });
  }
});

// Create a new Partner (POST request)
// router.post("/partners", async (req, res) => {
//   const { error } = createPartnerSchema.validate(req.body);

//   if (error) {
//     return res.status(400).json({
//       message: "Validation error",
//       error: error.details[0].message,
//     });
//   }

//   const { title, image, link, active } = req.body;

//   try {
//     const newPartner = await Partners.create({
//       title,
//       image,
//       link,
//       active,
//     });

//     res.status(201).json({
//       message: "Partner created successfully",
//       partner: newPartner,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "An error occurred while creating the Partner",
//       error: err.message,
//     });
//   }
// });

// // Update an existing Partner (PATCH request)
// router.patch("/partners/:id", async (req, res) => {
//   const { id } = req.params;

//   const { error } = updatePartnerSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({
//       message: "Validation error",
//       error: error.details[0].message,
//     });
//   }

//   try {
//     const partner = await Partners.findByPk(id);

//     if (!partner) {
//       return res.status(404).json({ message: "Partner not found" });
//     }

//     const { title, image, link, active } = req.body;

//     await partner.update({
//       title: title || partner.title,
//       image: image || partner.image,
//       link: link || partner.link,
//       active: active !== undefined ? active : partner.active,
//     });

//     res.status(200).json({
//       message: "Partner updated successfully",
//       partner,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "An error occurred while updating the Partner",
//       error: err.message,
//     });
//   }
// });

// // Delete a Partner (DELETE request)
// router.delete("/partners/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const partner = await Partners.findByPk(id);

//     if (!partner) {
//       return res.status(404).json({ message: "Partner not found" });
//     }

//     await partner.destroy();

//     res.status(200).json({
//       message: "Partner deleted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "An error occurred while deleting the Partner",
//       error: err.message,
//     });
//   }
// });

export default router;
