// src/admin/components.js
import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  GameSelect: componentLoader.add("GameSelect", "./GameSelect.js"),
  downloadPdf: componentLoader.add("downloadPDF", "./downloadbtn.jsx"),

  DashboardUI: componentLoader.add("DashboardUI", "./DashboardUI.jsx"),

  GenerateCertificates: componentLoader.add(
    "GenerateCertificates",
    "./GenerateCertificates.jsx"
  ),
  ResumeDownloadButton: componentLoader.add(
    "ResumeDownloadButton",
    "./ResumeDownloadButton"
  ),
};

export { componentLoader, Components };
