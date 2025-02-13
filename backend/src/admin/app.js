import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import uploadFeature from "@adminjs/upload";
import AdminJS, { ComponentLoader } from "adminjs";

import {
  Academy,
  Contact,
  Game,
  Partners,
  Program,
  RegistrationPayment,
  School,
  SpecialCamps,
  TDCGame,
  TDCRegistrationPayment,
  TDCSchool,
} from "../models/init.Model.js";
import authenticate from "./authenticateUser.js";
import { galleryResource } from "./gallery.Resource.js";
import { participationResource } from "./participation.Resources.js";
import { userResource } from "./user.Resourse.js";
import {
  ageGroup,
  manualRegistration,
  certificateResource,
  pointsTableResource,
  gamePointsTableResource,
  gameGroupResource,
  applicationResource,
  careerResource,
  FixtureResource,
  ResultFixtureResource,
  TableFixtureResource,
  gameTeamResource,
  playerResource,
  GameFixtureResource,
  TDCmanualReg,
  FootballManualRegistrationResource,
} from "./models.Resource.js";
import { componentLoader } from "./components.js";
import { TDCparticipationResource } from "./TDCparticipation.Resouces.js";

// Register AdminJS adapter
AdminJS.registerAdapter(AdminJSSequelize);
// const componentLoader = new ComponentLoader();

// Local provider configuration for file uploads
const localProvider = {
  bucket: "public/uploads", // Directory to store uploaded files
  opts: {
    baseUrl: "/uploads", // The URL base to access the uploaded files
  },
};

// Initialize AdminJS
const admin = new AdminJS({
  componentLoader,
  resources: [
    {
      resource: RegistrationPayment,
      options: {
        navigation: {
          name: "Events Management",
          icon: "Money",
        },
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
          edit: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
          delete: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
          show: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
          list: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
        },
      },
    },

    {
      resource: TDCRegistrationPayment,
      options: {
        navigation: {
          name: "TDC",
          icon: "Money",
        },
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
          edit: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
          delete: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
          show: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
          list: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
        },
      },
    },
    manualRegistration,
    ageGroup,
    certificateResource,
    pointsTableResource,
    gamePointsTableResource,
    gameGroupResource,
    applicationResource,
    careerResource,
    FootballManualRegistrationResource,

    TDCmanualReg,

    // rakesh code  start
    FixtureResource,
    ResultFixtureResource,
    TableFixtureResource,
    gameTeamResource,
    playerResource,
    GameFixtureResource,
    // rakesh code end

    {
      resource: Game,
      options: {
        navigation: {
          name: "Events Management",
          icon: "Event",
        },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin &&
              (currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
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
              currentAdmin &&
              (currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
          },
          delete: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
        },
      },
    },

    {
      resource: TDCGame,
      options: {
        navigation: {
          name: "TDC",
          icon: "Event",
        },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin &&
              (currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
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
              currentAdmin &&
              (currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
          },
          delete: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
        },
      },
    },

    {
      resource: School,
      options: {
        navigation: {
          name: "Events Management",
          icon: "Event",
        },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin &&
              (currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
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
              currentAdmin &&
              (currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
          },
          delete: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
        },
      },
    },

    {
      resource: TDCSchool,
      options: {
        navigation: {
          name: "TDC",
          icon: "Event",
        },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin &&
              (currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
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
              currentAdmin &&
              (currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
          },
          delete: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "Admin",
          },
        },
      },
    },
    participationResource,
    TDCparticipationResource,
    {
      resource: Partners,
      options: {
        navigation: { name: "Academy Management", icon: "User" },
        properties: {
          image: {
            type: "file", // Ensures the field is treated as a file upload
            isVisible: {
              list: true,
              edit: true,
              filter: true,
              show: true,
            },
          },
          imageKey: { isVisible: false },
          bucket: { isVisible: false },
          mime: { isVisible: false },
        },
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
            mimeTypes: ["image/png", "image/jpeg", "image/webp"], // Validate file types
          },
        }),
      ],
    },
    {
      resource: Academy,
      options: {
        navigation: { name: "Academy Management", icon: "Building" },
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
      },
    },
    {
      resource: Program,
      options: {
        navigation: { name: "Academy Management", icon: "Archive" },
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
          description: {
            type: "textarea",
            props: {
              rows: 10,
            },
          },
          image: {
            type: "file", // Ensures the field is treated as a file upload
            isVisible: {
              list: true,
              edit: true,
              filter: true,
              show: true,
            },
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
    },

    {
      resource: SpecialCamps,
      options: {
        navigation: { name: "Events", icon: "Flag" },
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
          description: {
            type: "textarea",
            props: {
              rows: 10,
            },
          },
          image: {
            type: "file", // Ensures the field is treated as a file upload
            isVisible: {
              list: true,
              edit: true,
              filter: true,
              show: true,
            },
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
    },
    galleryResource,
    {
      resource: Contact,
      options: {
        navigation: { name: "Communications", icon: "Chat" },
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
          message: {
            type: "textarea",
            props: {
              rows: 10,
            },
          },
        },
      },
    },
    userResource,
  ],
  rootPath: "/admin",
  branding: {
    companyName: "THUNDERBOLTS",
    logo: "/tdc-logo.png",
    softwareBrothers: false,
  },
  assets: {
    css: ["/admin-custom.css"],
    js: ["/custom-editor.js"],
  },
});

admin.watch();
// Set up the authentication middleware
const auth = {
  authenticate,
  cookieName: "adminjs",
  cookiePassword: process.env.COOKIE_PASSWORD || "some-secret-password",
};

// Build AdminJS router with authentication
const router = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  auth,
  AdminJSExpress.options
);

console.log("AdminJS initialized");

export default router;
