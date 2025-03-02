import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./response.scss";
import Loading from "../../components/loading/Loading";
import { Alert, Container, OverlayTrigger, Tooltip } from "react-bootstrap";

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
    const PRN = Number(params.get("PRN")); // Convert to number
    const PID = params.get("PID");
    const MD = params.get("MD");
    const AMT = params.get("AMT");
    const CRN = params.get("CRN");
    const DT = params.get("DT");
    const R1 = params.get("R1");
    const R2 = params.get("R2");
    const RU = params.get("RU");
    const DV = params.get("DV");

    const formData = sessionStorage.getItem("formData")
      ? JSON.parse(sessionStorage.getItem("formData"))
      : null;
    const fee = sessionStorage.getItem("fee") || "0";

    // If any required parameter is missing
    if (![PRN, PID, MD, AMT, CRN, DT, R1, R2, RU, DV].every((param) => param)) {
      setResponseMessage("Missing required parameters.");
      setIsSuccess(false);
      return;
    }

    const verificationString = `PID=${PID}&MD=${MD}&PRN=${PRN}&AMT=${AMT}&CRN=${CRN}&DT=${DT}&R1=${R1}&R2=${R2}&RU=${RU}`;

    const verifyPayment = async () => {
      if (isVerifyingRef.current) return;
      isVerifyingRef.current = true;
      requestCountRef.current += 1;
      console.log(
        `Payment verification request count: ${requestCountRef.current}`
      );

      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/copyapi/verify-payment",
          {
            verificationString,
            dv: DV,
            prn: PRN,
            paidAmount: Number(AMT),
            paymentMethod: "fonepay",
            formData,
            fee,
          }
        );

        if (response.status === 200) {
          const { verified, message } = response.data;
          setIsVerified(verified);
          setResponseMessage(message);
          setDetails(response.data);
          setIsSuccess(verified); // **Set isSuccess based on verification**
        } else {
          setResponseMessage(
            `Payment verification failed with status: ${response.status}`
          );
          setIsSuccess(false);
        }
      } catch (error) {
        setResponseMessage("Payment verification failed.");
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
        isVerifyingRef.current = false;
      }
    };

    const debouncedVerifyPayment = debounce(verifyPayment, 1000);
    debouncedVerifyPayment();

    return () => {
      // Cleanup if necessary
    };
  }, [location.search]);

  const copyToClipboard = (text) => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {copySuccess ? "Order number copied!" : "Click to copy order number"}
    </Tooltip>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="payment-reponse">
      {isSuccess ? (
        <Container>
          <h1>
            Thank you, <span>{details?.details?.fullName}</span>
          </h1>
          <p className="confirmation-message">
            Youll receive a confirmation email shortly.
          </p>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <h4
              className="order-number"
              onClick={() => copyToClipboard(details?.details?.prn)}
            >
              Order Number: <strong>{details?.details?.prn}</strong>
            </h4>
          </OverlayTrigger>
          <div className="box-to-details border">
            <h3 className="game-title">
              Sports: <span>{details?.details?.sports}</span>
            </h3>

            <h2 className="total-amount">
              TOTAL: NRP <strong>{details?.details?.paidAmount} /-</strong>
            </h2>
          </div>
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
