import bcrypt from "bcryptjs"; // Ensure you have bcrypt for password hashing
import { Users } from "../models/init.Model.js";

// Default admin credentials
const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

// Function to authenticate users
const authenticate = async (email, password) => {
  // Check if it's the default admin
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve({ email: DEFAULT_ADMIN.email, role: "Admin" });
  }

  // Check for regular users
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    return null; // User not found
  }

  // Compare the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null; // Invalid password
  }

  // If authenticated, return the user's details (email, role)
  return {
    email: user.email,
    role: user.role, // Return the user's role (Admin, Front desk, etc.)
  };
};

export default authenticate;
