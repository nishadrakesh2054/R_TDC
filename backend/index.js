import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import * as url from "url";
import path from "path";
import "@babel/register";
import adminRouter from "./src/admin/app.js";
import sequelize from "./src/db/index.js";
import os from "os";
import fs from "fs";
import {
  Partners,
  Game,
  School,
  Participation,
  Payment,
  Contact,
  PDFGenerater,
  PointsTable,
  Career,
} from "./src/routes/init.Routes.js";

import rateLimit from "express-rate-limit";
import gameFixture from "./src/routes/fixture.Route.js";
import ResultFixture from "./src/routes/fixture.Route.js";

import TDCGame from "./src/routes/TDC-Route/TDCgame.Route.js";
import TDCparticipation from "./src/routes/TDC-Route/TDCparticipation.Route.js";
import TDCPayment from "./src/routes/TDC-Route/TDCpayment.Route.js";
import TDCPDFGenerater from "./src/routes/TDC-Route/TDCpdfGenerator.Router.js";
import TDCschool from "./src/routes/TDC-Route/TDCschool.Route.js";
import TDCRegister from "./src/routes/NewTDC/registration.Route.js";
import NewTDCPayment from "./src/routes/NewTDC/payment.Route.js";
import copyPayment from "./src/routes/NewTDC/CopyPayment.Route.js";

const app = express();
os.tmpdir = () => "D:\\temp";
const tempDir = "D:\\temp";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// CORS setup
const allowedOrigins = [
  "*",
  "https://172.16.5.205",
  "http://172.16.5.205",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://thunderbolts.com.np",
  "http://thunderbolts.com.np",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/pdfs", express.static(path.join(__dirname, "public/pdfs")));

app.use(
  "/generated_certificates",
  express.static(path.join(__dirname, "public", "generated_certificates"))
);

// AdminJS setup (before body-parser)
app.use("/admin", adminRouter);

// Body parsing middleware (after AdminJS setup)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", apiLimiter);

// API routes
app.use("/api", Partners);
app.use("/api", School);
app.use("/api", Participation);
app.use("/api", Game);
app.use("/api", Payment);
app.use("/api", Contact);
app.use("/api", PDFGenerater);
app.use("/api", PointsTable);
app.use("/api", Career);
app.use("/api", gameFixture);
app.use("/api", ResultFixture);

// TDC routes defines
app.use("/api", TDCschool);
app.use("/api", TDCparticipation);
app.use("/api", TDCPayment);
app.use("/api", TDCPDFGenerater);
app.use("/api", TDCGame);

// New TDC routes defines
app.use("/api", TDCRegister);
app.use("/newapi", NewTDCPayment);
app.use("/copyapi", copyPayment);

app.get("/api/test", (req, res) => {
  res.send("API is working");
});

// Catch-all route for non-API and non-admin routes (React App)
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api") && !req.path.startsWith("/admin")) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  } else {
    res.status(404).send("Not Found");
  }
});

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync({ alter: false });
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
