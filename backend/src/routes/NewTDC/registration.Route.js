import express from "express";
import Registration from "../../models/NewTdc/RegisterForm.Model.js";
const router = express.Router();

// POST endpoint for registration form submission
router.post("/register_tdc", async (req, res) => {
  const {
    fullName,
    address,
    contactNo,
    email,
    dob,
    age,
    gender,
    schoolName,
    parentName,
    parentEmail,
    parentContactNo,
    parentAddress,
    sports,
    category,
    emergencyContactname,
    emergencyContactNumber,
    hasMedicalConditions,
    medicalDetails,
  } = req.body;

  try {
    const newRegistration = await Registration.create({
      fullName,
      address,
      contactNo,
      email,
      dob,
      age,
      gender,
      schoolName,
      parentName,
      parentEmail,
      parentContactNo,
      parentAddress,
      sports,
      category,
      emergencyContactname,
      emergencyContactNumber,
      hasMedicalConditions,
      medicalDetails,
    });

    res
      .status(201)
      .json({ message: "Registration successful!", data: newRegistration });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register", error: error.message });
  }
});

export default router;
