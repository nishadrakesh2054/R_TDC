import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./fortheunder.scss";
import { useNavigate } from "react-router-dom";

const ForThunderboltsRegister = () => {
  const navigate = useNavigate();
  //   const [deferredPrompt, setDeferredPrompt] = useState(null);
  //   const [isInstallable, setIsInstallable] = useState(false);

  //   useEffect(() => {
  //     const handleBeforeInstallPrompt = (e) => {
  //       //   console.log("beforeinstallprompt event fired"); // Debugging
  //       e.preventDefault();
  //       setDeferredPrompt(e);
  //       setIsInstallable(true);
  //     };

  //     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

  //     return () => {
  //       window.removeEventListener(
  //         "beforeinstallprompt",
  //         handleBeforeInstallPrompt
  //       );
  //     };
  //   }, []);

  //   const handleInstallClick = () => {
  //     if (deferredPrompt) {
  //       deferredPrompt.prompt();
  //       deferredPrompt.userChoice.then((choiceResult) => {
  //         if (choiceResult.outcome === "accepted") {
  //           console.log("User accepted the PWA installation");
  //         } else {
  //           console.log("User dismissed the PWA installation");
  //         }
  //         setDeferredPrompt(null);
  //       });
  //     }
  //   };

  return (
    <div className="fortheunder">
      <h1>Save Your Spot</h1>
      <p>Register for Upcoming THUNDERBOLTS Cup</p>
      <div className="buttong">
        <Button
          onClick={() => navigate("/register-thunderbolts-cup")}
          className="animate__bounce animate__animated"
        >
          Register Now
        </Button>
        {/* {isInstallable && (
          <button onClick={handleInstallClick}>Install App</button>
        )} */}
      </div>
    </div>
  );
};

export default ForThunderboltsRegister;
