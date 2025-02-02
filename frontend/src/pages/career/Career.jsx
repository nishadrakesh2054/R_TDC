import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";
import { FaBriefcase, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";
import "./Career.scss";
import { Link } from "react-router-dom";

const Career = () => {
	const [careers, setCareers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCareers = async () => {
			try {
				const response = await axios.get("/api/career/");
				setCareers(response.data);
				console.log(response.data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCareers();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="career">
			<Container className="career-container">
				<h1 className="text-white mb-3 text-center career-title">Join Our Team</h1>
				<p className="text-white mb-5 text-center">
					At TDC, we’re shaping the future of sports in Nepal. Be part
					of a community that values excellence, growth, and
					opportunity. Whether you’re a seasoned coach or a fresh
					graduate eager to learn, we have a place for you.
				</p>
				<h2 className="career-title mb-4">Career Opportunities</h2>

				<Row xs={1} md={2} lg={3} className="g-4">
					{careers?.map((career) => (
						<Col key={career.id}>
							<Link
								to={`/career/${career.id}/${encodeURIComponent(
									career.title
								)}`}
								className="text-decoration-none"
							>
								<Card className="h-100 career-card shadow-sm">
									<Card.Body>
										<Card.Title className="mb-3">
											{career.title}
										</Card.Title>
										<Card.Text className="text-white mb-3">
											<FaBriefcase className="me-2" />
											{career.department ||
												"Various Departments"}
										</Card.Text>
										<Card.Text className="text-white mb-3">
											<FaMoneyBillWave className="me-2" />
											{career.salary_range ||
												"Competitive Salary"}
										</Card.Text>
										<Card.Text className="text-white mb-3">
											<FaMapMarkerAlt className="me-2" />
											{career.location || "Onsite"}
										</Card.Text>
										<div className="mb-3">
											{career.skills?.map(
												(skill, index) => (
													<Badge
														bg="light"
														text="dark"
														className="me-2 mb-2"
														key={index}
													>
														{skill}
													</Badge>
												)
											)}
										</div>
										<Card.Text className="career-description">
											{career.description}
										</Card.Text>
									</Card.Body>
									<Card.Footer className="bg-white border-0">
										<Button
											variant="outline-primary"
											className="w-100"
										>
											Apply Now
										</Button>
									</Card.Footer>
								</Card>
							</Link>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
};

export default Career;
