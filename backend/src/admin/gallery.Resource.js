import { Gallery } from "../models/init.Model.js";
import AdminJS, { ComponentLoader } from "adminjs";
import AdminJSSequelize from "@adminjs/sequelize";
import uploadFeature from "@adminjs/upload";

// Register AdminJS adapter
AdminJS.registerAdapter(AdminJSSequelize);
const componentLoader = new ComponentLoader();

// Local provider configuration for file uploads
const localProvider = {
  bucket: "public/uploads", // Directory to store uploaded files
  opts: {
    baseUrl: "/uploads", // The URL base to access the uploaded files
  },
};

// Gallery resource configuration with upload feature
export const galleryResource = {
  resource: Gallery,
  options: {
    navigation: { name: "Media", icon: "Camera" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
    },
    properties: {
      image: {
        type: "file", // Ensures the field is treated as a file upload
        isVisible: { list: true, edit: true, filter: true, show: true },
      },
      imageKey: { isVisible: false },
      bucket: { isVisible: false },
      mime: { isVisible: false },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        file: "image", // Model field where the file is stored
        key: "imageKey", // Field to store file key/path
        bucket: "bucket", // Field to store the bucket/folder name
        mimeType: "mime", // Field to store MIME type
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg"], // Validate file types
      },
    }),
  ],
};
