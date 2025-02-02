import React, { useState } from "react";
import { Box, Button, DatePicker } from "@adminjs/design-system";
import { ApiClient } from "adminjs";

const DownloadPDFButton = (props) => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const api = new ApiClient();

	const handleDownload = async () => {
		try {
			const response = await api.resourceAction({
				resourceId: "Participations",
				actionName: "generatePDF",
				data: { startDate, endDate },
			});

			if (response.data.url) {
				window.open(response.data.url, "_blank");
			} else {
				console.error("No URL returned from the server");
			}
		} catch (error) {
			console.error("Error generating PDF:", error);
		}
	};

	return (
		<Box>
			<DatePicker
				value={startDate}
				onChange={(date) => setStartDate(date)}
			/>
			<DatePicker value={endDate} onChange={(date) => setEndDate(date)} />
			<Button onClick={handleDownload}>Generate PDF</Button>
		</Box>
	);
};

export default DownloadPDFButton;
