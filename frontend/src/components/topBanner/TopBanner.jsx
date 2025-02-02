import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./TopBanner.scss";
import { Link } from "react-router-dom";

const TopBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your target date to 27th November 2024
  const targetDate = new Date("2024-11-22T23:59:59").getTime();

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [targetDate]);

  return (
    <Link to="/register-thunderbolts-cup">
      <div className="top-banner">
        <Container>
          <div className="countdown-container">
            <h1>Registration Deadline for THUNDERBOLTS Cup 2024: Nov 22</h1>
            <div className="countdown">
              <div className="time-box">
                <span className="time">{timeLeft.days} </span>
                <p>Days</p>
              </div>{" "}
              <div className="time-box">
                {" "}
                <h1> : </h1>{" "}
              </div>
              <div className="time-box">
                <span className="time">{timeLeft.hours} </span>
                <p>Hrs</p>
              </div>
              <div className="time-box">
                {" "}
                <h1> : </h1>{" "}
              </div>
              <div className="time-box">
                <span className="time">{timeLeft.minutes} </span>
                <p>Min</p>
              </div>
              <div className="time-box">
                {" "}
                <h1> : </h1>{" "}
              </div>
              <div className="time-box">
                <span className="time">{timeLeft.seconds} </span>
                <p>Sec</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Link>
  );
};

export default TopBanner;
