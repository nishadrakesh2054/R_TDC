import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import "./CareerDec.scss";
import Apply from "../../components/apply/Apply.jsx"; // Import the Apply component

const CareerDec = () => {
	const [career, setCareer] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false); // State for modal visibility
	const { id } = useParams();

	useEffect(() => {
		const getCareerInfo = async () => {
			try {
				const response = await axios.get(`/api/career/${id}`);
				setCareer(response.data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		getCareerInfo();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!career) return <p>No career information found.</p>;

	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	return (
		<div className="career-dec">
			<Container className="career-dec-container">
				<Row className="justify-content-center">
					<Col md={10} lg={8}>
						<Card className="career-dec-card shadow">
							<Card.Body>
								<h1 className="career-title mb-4">
									{career.title}
								</h1>

								<div className="career-details mb-4">
									<p className="text-white">
										<FaMoneyBillWave className="me-2" />
										Salary Range:{" "}
										{career.salary_range
											? `NPR ${career.salary_range}`
											: "Not specified"}
									</p>
									<p className="text-white">
										<FaCalendarAlt className="me-2" />
										Posted on:{" "}
										{new Date(
											career.createdAt
										).toLocaleDateString()}
									</p>
								</div>

								<div
									className="career-description"
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(
											career.description
										),
									}}
								/>

								{career.active && (
									<Button
										variant="outline-light text-white"
										className="mt-4"
										onClick={handleShowModal} // Show modal on click
									>
										Apply for this position
									</Button>
								)}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>

			{/* Modal for Application Form */}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Submit Your Application</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Apply careerId={id} onClose={handleCloseModal} />{" "}
					{/* Pass careerId to Apply */}
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default CareerDec;
