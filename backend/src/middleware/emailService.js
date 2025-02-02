import nodemailer from "nodemailer";
import { eventsCalendar } from "./eventsCalendar.js";
import { PDFAttachments, INVITATION } from "./exportDownloadablepdf.js";
import fs from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  host: "smtp.stackmail.com",
  port: 465,
  secure: true,
  pool: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRegistrationEmail = async (
  recipientEmail,
  participantName,
  gameName,
  ageCategory,
  id,
  attachment,
  PRN
) => {
  const eventKey = `${gameName.toLowerCase()} ${ageCategory.toLowerCase()}`;
  // console.log("Generated event key:", eventKey);

  const eventDetails = eventsCalendar[eventKey];
  // console.log("Event details:", eventDetails);

  if (!eventDetails) {
    throw new Error(
      "Event details not found for the provided game and category"
    );
  }

  // Construct the attachment key
  const attachmentKey = `${gameName.toUpperCase()}_${ageCategory
    .toUpperCase()
    .replace(/-/g, "_")
    .replace(/\s+/g, "_")}`;
  // console.log("Attachment key:", attachmentKey);

  let attachmentToUse = PDFAttachments[attachmentKey];

  // console.log("All available attachments:", Object.keys(PDFAttachments));
  // console.log("Attachment found:", !!attachmentToUse);

  if (!attachmentToUse) {
    console.warn(`No specific attachment found for ${attachmentKey}`);
    attachmentToUse = INVITATION; // Use INVITATION as fallback
  }

  // console.log("Attachment to use:", attachmentToUse);

  const { registrationDeadline, eventDate } = eventDetails;

  const mailOptions = {
    from: '"THUNDERBOLTS" <' + process.env.EMAIL_USER + ">",
    to: recipientEmail,
    subject: `Registration Successful for THUNDERBOLTS CUP 2024!`,
    html: `
<p>Dear <strong>${participantName}</strong>,</p>

<p>Congratulations! You have successfully registered for the THUNDERBOLTS CUP 2024 in the <strong>${gameName}</strong> for the <strong>${ageCategory}</strong> category. We're thrilled to have you join us for this exciting event!</p>

<p>Here are your registration details:</p>
<ul>
  <li><strong>Event</strong>: THUNDERBOLTS CUP 2024</li>
  <li><strong>Sport</strong>: ${gameName}</li>
  <li><strong>Age Category</strong>: ${ageCategory}</li>
  <li><strong>Participation ID</strong>: ${id}</li>
  <li><strong>PRN (Participation Reference Number)</strong>: ${PRN}</li>
  <li><strong>Event Registration Deadline</strong>: ${registrationDeadline}</li>
  <li><strong>Event Date</strong>: ${eventDate}</li>
  <li><strong>Location</strong>: GEMS School, Dhapakhel, Lalitpur</li>
</ul>

<p>Please find the attached players' list form. We kindly ask you to download, fill it out, and submit it via email or in person, along with the birth certificate for each player, <strong>before the registration deadline</strong>.</p>

<p>If you have any questions or need further assistance, feel free to reach out. We can't wait to see you compete!</p>

<p>Best regards,<br>
Sports & Curricular Activities Department<br>
GEMS School<br>
Dhapakhel, Lalitpur</p>

<p>Contact:<br>
Tel: +977 9801973944/64/65/67/75<br>
Email: info@thunderbolts.com.np</p>`,
    attachments: [],
  };

  // Add game-specific attachment if it exists
  if (attachmentToUse && fs.existsSync(attachmentToUse)) {
    mailOptions.attachments.push({
      filename: path.basename(attachmentToUse),
      path: attachmentToUse,
    });
    console.log("Attaching file:", attachmentToUse);
  } else {
    console.warn(`Game-specific attachment not found: ${attachmentToUse}`);
  }

  // Add INVITATION attachment if it exists
  if (fs.existsSync(INVITATION)) {
    mailOptions.attachments.push({
      filename: path.basename(INVITATION),
      path: INVITATION,
    });
    console.log("Attaching INVITATION file:", INVITATION);
  } else {
    console.warn(`INVITATION attachment not found: ${INVITATION}`);
  }

  if (mailOptions.attachments.length === 0) {
    console.warn("No attachments found to send with the email");
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log("Registration email sent successfully");
  } catch (error) {
    console.error("Error sending registration email:", error);
    throw new Error("Failed to send registration email: " + error.message);
  }
};

export const sendContactEmail = async (
  contactName,
  contactEmail,
  contactMessage
) => {
  const mailOptions = {
    from: '"THUNDERBOLTS" <' + process.env.EMAIL_USER + ">",
    to: "info@thunderbolts.com.np", // Recipient email
    subject: "New Contact Message Received",
    text:
      `You have received a new contact message from ${contactName}.\n\n` +
      `Message: ${contactMessage}\n` +
      `Email: ${contactEmail}\n\n` +
      `Please respond to the query as soon as possible.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully");
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw new Error("Failed to send contact email.");
  }
};
