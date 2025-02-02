import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const Apply = ({ careerId, onClose }) => {
	const [formData, setFormData] = useState({
		applicantName: "",
		email: "",
		phone: "",
		coverLetter: "",
	});
	const [resume, setResume] = useState(null);
	const [submitStatus, setSubmitStatus] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setResume(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData();
		for (const key in formData) {
			form.append(key, formData[key]);
		}
		if (resume) {
			form.append("resume", resume);
		}
		form.append("careerId", careerId); // Add careerId to form data

		try {
			const response = await axios.post("/api/application", form, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setSubmitStatus({
				type: "success",
				message: "Application submitted successfully!",
			});
			onClose(); // Close modal after successful submission
		} catch (error) {
			setSubmitStatus({
				type: "danger",
				message: "Failed to submit application. Please try again.",
			});
			console.error("Error submitting application:", error);
		}
	};

	return (
		<>
			{submitStatus && (
				<Alert variant={submitStatus.type}>
					{submitStatus.message}
				</Alert>
			)}
			<Form onSubmit={handleSubmit}>
				{/* Form fields as before */}
				<Form.Group className="mb-3">
					<Form.Label>Full Name</Form.Label>
					<Form.Control
						type="text"
						name="applicantName"
						value={formData.applicantName}
						onChange={handleChange}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Phone</Form.Label>
					<Form.Control
						type="tel"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Resume</Form.Label>
					<Form.Control
						type="file"
						name="resume"
						onChange={handleFileChange}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Cover Letter</Form.Label>
					<Form.Control
						as="textarea"
						rows={4}
						name="coverLetter"
						value={formData.coverLetter}
						onChange={handleChange}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit Application
				</Button>
			</Form>
		</>
	);
};

export default Apply;
