import React, { useState } from "react";
import { Box, H2, Text, Button, Link } from "@adminjs/design-system";

const GenerateCertificates = (props) => {
	const { record } = props;
	const [isGenerating, setIsGenerating] = useState(false);
	const [pdfUrl, setPdfUrl] = useState(null);

	const handleGenerateCertificates = async () => {
		setIsGenerating(true);
		try {
			const response = await fetch(
				`/admin/api/resources/Certificate/records/${record.id}/generateCertificates`,
				{
					method: "POST",
				}
			);
			const data = await response.json();
			if (data.msg) {
				alert(data.msg);
				// Use the filename returned from the server
				setPdfUrl(`/api/download-certificates/${data.pdfFilename}`);
			}
		} catch (error) {
			console.error("Error generating certificates:", error);
			alert("Failed to generate certificates");
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<Box>
			<H2>Generate Certificates</H2>
			<Text>
				Click the button below to generate certificates using the
				uploaded Excel file.
			</Text>
			<Button
				onClick={handleGenerateCertificates}
				disabled={isGenerating}
			>
				{isGenerating ? "Generating..." : "Generate Certificates"}
			</Button>
			{pdfUrl && (
				<Box mt="xl">
					<Text>Certificates generated successfully!</Text>
					<Link href={pdfUrl} target="_blank">
						Download Certificates (PDF)
					</Link>
				</Box>
			)}
		</Box>
	);
};

export default GenerateCertificates;
