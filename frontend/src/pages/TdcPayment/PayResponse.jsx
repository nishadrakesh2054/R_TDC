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

    const verificationString = `PRN=${PRN}PID=${PID}&RC=${RC}&UID=${UID}&BC=${BC}&INI=${INI}&P_AMT=${P_AMT}&R_AMT=${R_AMT}`;


    const verifyPayment = async () => {
      if (isVerifyingRef.current) return;
      isVerifyingRef.current = true;
      requestCountRef.current += 1;

      setIsLoading(true);
      try {
            // Log data before sending the request
    console.log("Sending request to backend with data:", {
        verificationString,
        dv: DV,
        prn: PRN,
        paidAmount: Number(P_AMT),
        paymentMethod: "fonepay",
        formData,
      });
        const response = await axios.post(
          "http://localhost:3000/tdc-api/verify-payment",
          {
            verificationString,
            dv: DV,
            prn: PRN,
            paidAmount: Number(P_AMT),
            paymentMethod: "fonepay",
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
            You will receive a confirmation email shortly.
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
