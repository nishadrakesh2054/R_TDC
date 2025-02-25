import express from "express";
const router = express.Router();
import Payment from "../../models/NewTdc/Payment.Model.js";
import axios from "axios";

// Initiate Payment (Fonepay Example)
router.post("/initiate", async (req, res) => {
  try {
    const { userId, amount, paymentMethod } = req.body;

    const newPayment = await Payment.create({ userId, amount, paymentMethod });

    // Mock Fonepay API Request (Replace with actual API details)
    const fonepayResponse = await axios.post("https://fonepay/api/initiate", {
      amount,
      transactionId: newPayment.id, // Send your own transaction ID
    });

    res.json({
      message: "Payment initiated",
      paymentId: newPayment.id,
      redirectUrl: fonepayResponse.data.redirectUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Payment initiation failed" });
  }
});

// Verify Payment
router.post("/verify", async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    const payment = await Payment.findOne({ where: { transactionId } });
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    payment.status = status;
    await payment.save();

    res.json({ message: "Payment updated", payment });
  } catch (error) {
    res.status(500).json({ error: "Payment verification failed" });
  }
});

export default router;
