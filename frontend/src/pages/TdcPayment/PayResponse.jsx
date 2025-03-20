import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./response.scss";
import Loading from "../../components/loading/Loading";
import { Alert, Container } from "react-bootstrap";

const PayResponse = () => {
  const location = useLocation();
  const [responseMessage, setResponseMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [details, setDetails] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const isVerifyingRef = useRef(false);
  const requestCountRef = useRef(0);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const PRN = params.get("PRN");
    const PID = params.get("PID");
    const PS = params.get("PS");
    const RC = params.get("RC");
    const DV = params.get("DV");
    const UID = params.get("UID");
    const BC = params.get("BC");
    const INI = params.get("INI");
    const P_AMT = params.get("P_AMT");
    const R_AMT = params.get("R_AMT");

    const formData = sessionStorage.getItem("formData")
      ? JSON.parse(sessionStorage.getItem("formData"))
      : null;
    //   const prn = sessionStorage.getItem("prn");

    // Ensure all required parameters exist
    if (
      ![PRN, PID, PS, RC, UID, BC, INI, P_AMT, R_AMT, DV].every(
        (param) => param
      )
    ) {
      setResponseMessage("Missing required parameters.");
      setIsSuccess(false);
      return;
    }

    const verifyPayment = async () => {
      if (isVerifyingRef.current) return;
      isVerifyingRef.current = true;
      requestCountRef.current += 1;
      setIsLoading(true);
      try {
        // Log data before sending the request
        console.log("Sending request to backend with data:", {
          PRN: PRN.trim(),
          PID,
          PS,
          RC,
          UID,
          BC,
          INI,
          P_AMT,
          R_AMT,
          DV,
          formData,
        });

        const response = await axios.post(
          "http://localhost:3000/tdc-api/verify-payment",
          {
            PRN: PRN.trim(),
            PID,
            PS,
            RC,
            UID,
            BC,
            INI,
            P_AMT,
            R_AMT,
            DV,
            formData,
          }
        );

        // Log the response data after the request
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const { verified, message } = response.data;
          setIsVerified(verified);
          setResponseMessage(message);
          setDetails(response.data);
          setIsSuccess(verified);
        } else {
          setResponseMessage(
            `Payment verification failed with status: ${response.status}`
          );
          setIsSuccess(false);
        }
      } catch (error) {
        console.error(
          "Error during payment verification:",
          error.response || error.message
        );

        setResponseMessage("Payment verification failed.");
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
        isVerifyingRef.current = false;
      }
    };

    const debouncedVerifyPayment = debounce(verifyPayment, 1000);
    debouncedVerifyPayment();

    return () => {};
  }, [location.search]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="payment-reponse">
      {isSuccess ? (
        <Container>
          <h1>
            Thank you, <span>{details?.paymentDetails?.fullName}</span>!
          </h1>
          <p className="confirmation-message">
            Your registration has been successfully completed, and your payment
            has been recieved. You will shortly receive a confirmation email
            with further details.
          </p>

          <div className="box-to-details border">
            <h2 className="total-amount">
              Total Paid: NRP &nbsp;
              <strong>{details?.paymentDetails?.amount} /-</strong>
            </h2>
          </div>

          <p className="success-message">
            We look forward to seeing you at the academy. If you have any
            questions, please contact our team.
          </p>
        </Container>
      ) : (
        <Container>
          <Alert variant="danger" className="error-message">
            {responseMessage}
          </Alert>
        </Container>
      )}
    </div>
  );
};

export default PayResponse;
