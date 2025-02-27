import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import getCurrentDate from "./currentdate";
import { v4 as uuidv4 } from "uuid";
import { Container, Button, Alert } from "react-bootstrap";
import "./payment.scss";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { filteredFormData, fee } = location.state;
  const merchantCodeenv = import.meta.env.VITE_MERCHANT_CODE;
  const returnUrlenv = import.meta.env.VITE_RETURN_URL;
  const env = import.meta.env.VITE_ENV;
  const paymentUrlenv = import.meta.env.VITE_PAYMENT_URL;

  console.log(merchantCodeenv);

  const PID = merchantCodeenv;
  const MD = "P";
  const AMT = parseFloat(fee).toFixed(1);
  const CRN = "NPR";
  const DT = getCurrentDate();
  const R1 = String(filteredFormData?.schoolName || "").substring(0, 160);
  const R2 = String(JSON.stringify(filteredFormData?.game) || "N/A").substring(
    0,
    50
  );
  const RU = `${returnUrlenv}/#/payment-response`;
  const PRN = uuidv4().substring(0, 25);

  const generatePaymentUrl = async () => {
    setLoading(true);
    setError(null);

    // Validation
    if (!filteredFormData || !fee) {
      setError("Form data or fee is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/generate-hash", {
        md: MD,
        prn: PRN,
        amt: AMT,
        crn: CRN,
        dt: DT,
        r1: R1,
        r2: R2,
        ru: RU,
        pid: PID,
      });

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
        // Server responded with a status other than 200
        setError(
          `Error: ${err.response.data.message || "Failed to generate hash"}`
        );
      } else if (err.request) {
        // Request was made but no response received
        setError("No response from the server. Please try again later.");
      } else {
        // Something else caused the error
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="here-payment-form">
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

export default PaymentForm;
