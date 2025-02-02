import { Game } from "../models/init.Model.js";
import { sendRegistrationEmail } from "./emailService.js";
import * as PDFAttachments from "./exportDownloadablepdf.js";

export const sendRegistrationSuccessEmail = async ({ locals }, res) => {
  const { school, participation } = locals;

  if (!school || !participation) {
    console.error("Missing school or participation data");
    return;
  }

  try {
    const selectedGame = await Game.findByPk(participation.gameId);

    if (!selectedGame) {
      console.error("Selected game not found.");
      return;
    }

    const gameName = selectedGame.name.toLowerCase();
    const gameCategory = selectedGame.category?.toLowerCase() || "";

    console.log("Game name:", gameName, "Game category:", gameCategory);

    const attachmentKey = `${gameName.toUpperCase()}_${gameCategory
      .toUpperCase()
      .replace(/-/g, "_")}`;
    console.log("Attachment key:", attachmentKey);

    let attachment = PDFAttachments[attachmentKey];

    if (!attachment) {
      console.warn(`No specific attachment found for ${attachmentKey}`);
      attachment = PDFAttachments.INVITATION;
    }

    console.log("Attachment path:", attachment);

    const emailDetails = {
      schoolEmail: school.email,
      schoolName: school.name,
      gameName: selectedGame.name,
      gameCategory: selectedGame.category,
      participationId: participation.id,
      prn: participation.PRN,
      paidAmount: participation.paidAmount,
      eventDate: selectedGame.eventDate,
      location: selectedGame.location,
    };

    console.log("Participation ID:", participation.id);

    await sendRegistrationEmail(
      school.email,
      school.name,
      selectedGame.name,
      selectedGame.category,
      participation.id.toString(),
      attachment,
      participation.PRN
    );

    console.log("Email sent to:", school.email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
