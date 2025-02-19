import { Participation } from "../models/init.Model.js";
import { Components } from "./components.js";
import { generatePDF } from "./pdfgenerator.js";

export const participationResource = {
  resource: Participation,
  options: {
    navigation: {
      name: "Thunderbolts Cup",
      icon: "Event",
    },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin &&
          (currentAdmin.role === "Admin" || currentAdmin.role === "Front desk"),
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin &&
          (currentAdmin.role === "Admin" || currentAdmin.role === "Front desk"),
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },

      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },

      generatePDF: {
        actionType: "resource",
        component: Components.downloadPdf,
        handler: async (request, response, context) => {
          const { startDate, endDate } = request.payload;
          const pdfFileName = await generatePDF(
            new Date(startDate),
            new Date(endDate)
          );
          return {
            url: `/api/download-participations/${pdfFileName}`,
            msg: "PDF generated successfully",
          };
        },
        isAccessible: ({ currentAdmin }) =>
          currentAdmin &&
          (currentAdmin.role === "Admin" || currentAdmin.role === "Front desk"),
      },
    },
    properties: {
      id: {
        isVisible: {
          list: true,
          filter: false,
          show: true,
          edit: false,
        },
      },
      updatedAt: {
        isVisible: {
          list: false,
          filter: false,
          show: true,
          edit: false,
        },
      },
      schoolId: {
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      gameId: {
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
    },
  },
};
