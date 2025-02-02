import React, { useEffect } from "react";
import { ApiClient } from "adminjs";
import { Loader } from "@adminjs/design-system";

const GeneratePdf = (props) => {
  const { record, resource } = props;
  const api = new ApiClient();

  useEffect(() => {
    api
      .recordAction({
        recordId: record.id,
        resourceId: resource.id,
        actionName: "PDFGenerator",
      })
      .then((response) => {
        const pdfUrl = response.data.url;
        window.open(pdfUrl, "_blank");
      })
      .catch((err) => {
        console.error(err);
      });
  }, [record.id, resource.id]);

  return <Loader />;
};

export default GeneratePdf;
