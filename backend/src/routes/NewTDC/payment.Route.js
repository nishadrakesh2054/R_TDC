import express from "express";
import crypto from "crypto";
import axios from "axios";
import paymentTDC from "../../models/NewTdc/Payment.Model.js";

const router = express.Router();

/*
✅ Secure Hash Calculation (DV) using HMAC-SHA512
 */
const generateSecureHash = (params) => {
  const { PID, MD, PRN, AMT, CRN, DT, R1, R2, RU } = params;

  // Concatenate parameters as per Fonepay docs
  const data = `${PID},${MD},${PRN},${AMT},${CRN},${DT},${R1},${R2},${RU}`;

  // Generate HMAC-SHA512 hash
  return crypto
    .createHmac("sha512", process.env.FONEPAY_SECRET_KEY)
    .update(data)
    .digest("hex");
};

/*✅ Validate Payment Request */
const validatePaymentRequest = (requestData) => {
  const { pid, md, prn, amt, crn, dt, r1, r2, ru } = requestData;

  // Validate RU
  if (!ru || ru.length > 150)
    return "RU must be a string with a maximum length of 150.";

  // Validate PID
  if (!pid || pid.length < 3 || pid.length > 20)
    return "PID must be a string between 3 and 20 characters.";

  // Validate PRN
  if (!prn || prn.length < 3 || prn.length > 25)
    return "PRN must be a string between 3 and 25 characters.";

  // Validate AMT
  if (!amt || isNaN(amt) || amt.toString().length > 18)
    return "AMT must be a valid number with a maximum length of 18.";

  // Validate CRN
  if (crn !== "NPR" || crn.length !== 3) return "CRN must be exactly 'NPR'.";
  // Validate R1
  if (!r1 || r1.length > 160)
    return "R1 must be a string with a maximum length of 160.";

  // Validate R2
  if (r2 && r2.length > 50)
    return "R2 must be a string with a maximum length of 50.";

  // Validate MD
  if (!md || md.length < 1 || md.length > 3)
    return "MD must be a string between 1 and 3 characters.";

  return null; // No validation errors
};

/* ✅ Initiate Payment (Fonepay) */
router.post("/initiate", async (req, res) => {
  try {
    const { registrationId, amount, paymentMethod } = req.body;

    // Validate request data
    if (!registrationId || !amount || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate a unique transaction ID
    const transactionId = `TXN${Date.now()}`;

    // Prepare Fonepay Payment Request Data
    const requestData = {
      PID: process.env.FONEPAY_MERCHANT_CODE,
      MD: "P",
      PRN: transactionId,
      AMT: amount,
      CRN: "NPR",
      DT: new Date().toLocaleDateString("en-US"),
      R1: "Payment for Registration",
      R2: "N/A",
      RU: process.env.FONEPAY_RETURN_URL,
    };

    // ✅ Use the validation function
    const validationError = validatePaymentRequest(requestData);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Generate Secure Hash (DV)
    const DV = generateSecureHash(requestData);

    // Store Payment Data in DB
    const newPayment = await paymentTDC.create({
      registrationId,
      amount,
      paymentMethod,
      transactionId,
    });

    // Construct Fonepay Payment URL
    const fonepayUrl = `${
      process.env.FONEPAY_API_URL
    }/api/merchantRequest?${new URLSearchParams({
      ...requestData,
      DV,
    })}`;

    res.json({
      message: "Payment initiated",
      paymentId: newPayment.id,
      transactionId: newPayment.transactionId,
      redirectUrl: fonepayUrl,
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});

/* ✅ Verify Payment (Fonepay Callback)  */
router.get("/verify", async (req, res) => {
  try {
    const { PRN, PID, PS, RC, UID, BC, INI, P_AMT, R_AMT, DV } = req.query;

    // Find Payment by Transaction ID (PRN)
    const payment = await paymentTDC.findOne({ where: { transactionId: PRN } });
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    // Recalculate Secure Hash (DV)
    const calculatedDV = generateSecureHash({
      PRN,
      PID,
      PS,
      RC,
      UID,
      BC,
      INI,
      P_AMT,
      R_AMT,
    });

    // Validate Hash
    if (DV !== calculatedDV) {
      return res.status(400).json({ error: "Invalid hash verification" });
    }

    // Update Payment Status
    payment.status = PS === "true" ? "success" : "failed";
    if (PS === "true") payment.paymentDate = new Date();
    await payment.save();

    // Redirect Based on Payment Status
    res.redirect(PS === "true" ? "/success" : "/failed");
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
});

/* ✅ Check Transaction Status  */

router.post("/check-status", async (req, res) => {
  try {
    const { transactionId, amount } = req.body;
    if (!transactionId || !amount) {
      return res.status(400).json({ error: "Missing transactionId or amount" });
    }

    // Authorization Header
    const authString = `${process.env.FONEPAY_USERNAME}:${process.env.FONEPAY_PASSWORD}`;
    const authHeader = "Basic " + Buffer.from(authString).toString("base64");

    // Generate Secure Hash for Authentication
    const message = `${process.env.FONEPAY_USERNAME},${process.env.FONEPAY_PASSWORD},POST,application/json,/merchant/merchantDetailsForThirdParty/txnVerification,{"prn": "${transactionId}","merchantCode": "${process.env.FONEPAY_MERCHANT_CODE}","amount": "${amount}"}`;
    const authHash = crypto
      .createHmac("sha512", process.env.FONEPAY_SECRET_KEY)
      .update(message)
      .digest("hex");

    // Send API Request to Check Status
    const response = await axios.post(
      `${process.env.FONEPAY_API_URL}/api/merchant/merchantDetailsForThirdParty/txnVerification`,
      {
        prn: transactionId,
        merchantCode: process.env.FONEPAY_MERCHANT_CODE,
        amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
          auth: authHash,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Transaction status check error:", error);
    res.status(500).json({ error: "Transaction status check failed" });
  }
});

export default router;
