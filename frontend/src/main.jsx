import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom"; // Change this line
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      {" "}
      {/* Use HashRouter here */}
      <App />
    </HashRouter>
  </StrictMode>
);
