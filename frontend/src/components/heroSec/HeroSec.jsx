import React from "react";
import { Button, Container } from "react-bootstrap";
import "./hero.scss";
import { useNavigate } from "react-router-dom";
import btnside from "../../assets/yellow-btn-side.png";

const HeroSec = () => {
	const navigate = useNavigate();
	return (
		<div className="hero-sec">
			<Container>
				<div className="heading-texts-header">
					<h1>
						HOME OF THE <br />
						<span>THUNDERBOLTS</span>
					</h1>
					<p>
						Where Champions Are <span>Made</span>
					</p>
					<div className="join-btn-her">
						<Button
							onClick={() => {
								navigate("/register-thunderbolts-cup");
							}}
							className="animate__pulse animate__animated animate__bounce not-show-in-big "
						>
							<p>Register for TBC </p>
							<img src={btnside} alt="btn" />
						</Button>

						<Button
							onClick={() => {
								navigate("/contact");
							}}
							className="animate__pulse animate__animated animate__bounce show-in-big"
						>
							<p>Join now </p>
							<img src={btnside} alt="btn" />
						</Button>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default HeroSec;
