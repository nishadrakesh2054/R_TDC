import {
  FOOTBALL_U_12_BOYS,
  FOOTBALL_U_16_BOYS,
  BASKETBALL_U_16_BOYS,
  BASKETBALL_U_18_BOYS,
  BASKETBALL_U_18_GIRLS,
  CHESS_U_14_BOYS,
  CHESS_U_14_GIRLS,
  CHESS_U_18_BOYS,
  CHESS_U_18_GIRLS,
  CRICKET_U_12_BOYS,
  CRICKET_U_18_BOYS,
  CRICKET_U_16_BOYS,
  FUTSAL_U_13_GIRLS,
  FUTSAL_U_18_BOYS,
  FUTSAL_U_18_GIRLS,
  JUDO_BOYS,
  JUDO_GIRLS,
  TABLE_TENNIS_U_12_BOYS,
  TABLE_TENNIS_U_12_GIRLS,
  TABLE_TENNIS_U_15_BOYS,
  TABLE_TENNIS_U_15_GIRLS,
  TABLE_TENNIS_U_18_BOYS,
  TABLE_TENNIS_U_18_GIRLS,
  TAEKWONDO_BOYS,
  TAEKWONDO_GIRLS,
  VOLLEYBALL_U_18_BOYS,
  VOLLEYBALL_U_18_GIRLS,
  SWIMMING,
  TENNIS_U_18_BOYS,
  TENNIS_U_18_GIRLS,
  ARCHERY_U_18_BOYS,
  ARCHERY_U_18_GIRLS,
} from "./exportDownloadablepdf.js"; // Adjust the path as necessary

const downloadPdf = (game, category) => {
  let pdfFile;

  // Normalize game and category for comparison
  const normalizedGame = game.toLowerCase();
  const normalizedCategory = category ? category.toLowerCase() : "";

  console.log(normalizedCategory, normalizedGame);

  // Determine the appropriate PDF based on category and game
  if (normalizedGame === "football") {
    if (normalizedCategory === "u-12 boys") {
      pdfFile = FOOTBALL_U_12_BOYS;
    } else if (normalizedCategory === "u-16 boys") {
      pdfFile = FOOTBALL_U_16_BOYS;
    }
  } else if (normalizedGame === "basketball") {
    if (normalizedCategory === "u-16 boys") {
      pdfFile = BASKETBALL_U_16_BOYS;
    } else if (normalizedCategory === "u-18 boys") {
      pdfFile = BASKETBALL_U_18_BOYS;
    } else if (normalizedCategory === "u-18 girls") {
      pdfFile = BASKETBALL_U_18_GIRLS;
    }
  } else if (normalizedGame === "chess") {
    if (normalizedCategory === "u-14 boys") {
      pdfFile = CHESS_U_14_BOYS;
    } else if (normalizedCategory === "u-14 girls") {
      pdfFile = CHESS_U_14_GIRLS;
    } else if (normalizedCategory === "u-18 boys") {
      pdfFile = CHESS_U_18_BOYS;
    } else if (normalizedCategory === "u-18 girls") {
      pdfFile = CHESS_U_18_GIRLS;
    }
  } else if (normalizedGame === "cricket") {
    if (normalizedCategory === "u-12 boys") {
      pdfFile = CRICKET_U_12_BOYS;
    } else if (normalizedCategory === "u-16 boys") {
      pdfFile = CRICKET_U_16_BOYS;
    } else if (normalizedCategory === "u-18 boys") {
      pdfFile = CRICKET_U_18_BOYS;
    }
  } else if (normalizedGame === "futsal") {
    if (normalizedCategory === "u-13 girls") {
      pdfFile = FUTSAL_U_13_GIRLS;
    } else if (normalizedCategory === "u-18 boys") {
      pdfFile = FUTSAL_U_18_BOYS;
    } else if (normalizedCategory === "u-18 girls") {
      pdfFile = FUTSAL_U_18_GIRLS;
    }
  } else if (normalizedGame === "judo") {
    if (normalizedCategory === "boys") {
      pdfFile = JUDO_BOYS;
    } else if (normalizedCategory === "girls") {
      pdfFile = JUDO_GIRLS;
    }
  } else if (normalizedGame === "table tennis") {
    if (normalizedCategory === "u-12 boys") {
      pdfFile = TABLE_TENNIS_U_12_BOYS;
    } else if (normalizedCategory === "u-12 girls") {
      pdfFile = TABLE_TENNIS_U_12_GIRLS;
    } else if (normalizedCategory === "u-15 boys") {
      pdfFile = TABLE_TENNIS_U_15_BOYS;
    } else if (normalizedCategory === "u-15 girls") {
      pdfFile = TABLE_TENNIS_U_15_GIRLS;
    } else if (normalizedCategory === "u-18 boys") {
      pdfFile = TABLE_TENNIS_U_18_BOYS;
    } else if (normalizedCategory === "u-18 girls") {
      pdfFile = TABLE_TENNIS_U_18_GIRLS;
    }
  } else if (normalizedGame === "taekwondo") {
    if (normalizedCategory === "boys") {
      pdfFile = TAEKWONDO_BOYS;
    } else if (normalizedCategory === "girls") {
      pdfFile = TAEKWONDO_GIRLS;
    }
  } else if (normalizedGame === "volleyball") {
    if (normalizedCategory === "u-18 boys") {
      pdfFile = VOLLEYBALL_U_18_BOYS;
    } else if (normalizedCategory === "u-18 girls") {
      pdfFile = VOLLEYBALL_U_18_GIRLS;
    }
  } else if (normalizedGame === "swimming") {
    pdfFile = SWIMMING;
  } else if (normalizedGame === "tennis") {
    if (normalizedCategory === "u-18 boys") {
      pdfFile = TENNIS_U_18_BOYS;
    } else if (normalizedCategory === "u-18 girls") {
      pdfFile = TENNIS_U_18_GIRLS;
    }
  } else if (normalizedGame === "archery") {
    if (normalizedCategory === "u-18 boys") {
      pdfFile = ARCHERY_U_18_BOYS;
    } else if (normalizedCategory === "u-18 girls") {
      pdfFile = ARCHERY_U_18_GIRLS;
    }
  } else {
    console.error("No PDF found for the selected game and category.");
    return; // Exit if no match
  }

  // Create an anchor element and trigger the download
  if (pdfFile) {
    const link = document.createElement("a");
    link.href = pdfFile;
    link.target = "_blank"; // Open in a new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.error("No PDF file found.");
  }
};

export default downloadPdf;
