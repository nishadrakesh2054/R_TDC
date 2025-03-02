import { useState } from "react";
import axios from "axios";
import getCurrentDate from "./newDate";

import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Container, Button, Alert } from "react-bootstrap";
import "./payment.scss";

const PayForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const { formData, fee } = location.state;

  const merchantCodeenv = import.meta.env.VITE_MERCHANT_CODE;
  const returnUrlenv = import.meta.env.VITE_RETURN_URL;
  const paymentUrlenv = import.meta.env.VITE_PAYMENT_URL;
  console.log("VITE_MERCHANT_CODE:", merchantCodeenv);

  const PID = merchantCodeenv;
  const MD = "P";
  const AMT = parseFloat(fee).toFixed(1);
  const CRN = "NPR";
  const DT = getCurrentDate();
  const R1 = String(formData?.fullName || "").substring(0, 160);
  const R2 = String(JSON.stringify(formData?.sports) || "N/A").substring(0, 50);
  const RU = `${returnUrlenv}/#/tdc-pay-response`;
  const PRN = uuidv4().substring(0, 25);

  const generatePaymentUrl = async () => {
    setLoading(true);
    setError(null);

    // Validation
    if (!formData || !fee) {
      setError("Form data or fee is missing.");
      setLoading(false);
      return;
    }

    console.log("PID:", PID);

    // Ensure the fields are not undefined
    const requiredFields = { PID, MD, PRN, AMT, CRN, DT, R1, R2, RU };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === undefined || value === null || value === "") {
        console.error(`Missing required field: ${key}`);
        setError(`Missing required field: ${key}`);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/copyapi/generate-hash",
        {
          md: MD,
          prn: PRN,
          amt: AMT,
          crn: CRN,
          dt: DT,
          r1: R1,
          r2: R2,
          ru: RU,
          pid: PID,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      console.log("generate hash", response);

      const { dv } = response.data;
      const paymentUrl = `${paymentUrlenv}/api/merchantRequest?PID=${PID}&MD=${MD}&AMT=${AMT}&CRN=${CRN}&DT=${encodeURIComponent(
        DT
      )}&R1=${encodeURIComponent(R1)}&R2=${encodeURIComponent(
        R2
      )}&DV=${dv}&RU=${encodeURIComponent(RU)}&PRN=${PRN}`;

      window.location.href = paymentUrl;
    } catch (err) {
      console.error("Payment generation error:", err);
      if (err.response) {
        setError(
          `Error: ${err.response.data.message || "Failed to generate hash"}`
        );
      } else if (err.request) {
        setError("No response from the server. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="here-payment-form ">
      <Container>
        <h1 className="form-title">Processed Fonepay Payment</h1>

        <h2 className="total-amount">
          TOTAL AMOUNT: <span>{fee}</span>
        </h2>

        {error && (
          <Alert variant="danger" className="error-message">
            {error}
          </Alert>
        )}

        <Button
          onClick={generatePaymentUrl}
          disabled={loading}
          className="pay-button"
        >
          {loading ? "Processing..." : "Pay with Fonepay"}
        </Button>
      </Container>
    </div>
  );
};

export default PayForm;
