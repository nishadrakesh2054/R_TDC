import React from "react";
import { Button } from "@adminjs/design-system";

const ResumeDownloadButton = ({ record }) => {
	const resumeUrl = record.params.resumeUrl;

	if (!resumeUrl) return <span>No resume uploaded</span>;

	return (
		<Button
			as="a"
			href={resumeUrl}
			download
			target="_blank"
			rel="noopener noreferrer"
		>
			Download Resume
		</Button>
	);
};

export default ResumeDownloadButton;
