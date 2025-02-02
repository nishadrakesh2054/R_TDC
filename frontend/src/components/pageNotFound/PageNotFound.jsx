import React from "react";
import { Button, Container } from "react-bootstrap";
import "./page.scss";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="page-not-found">
        <Container>
          <div className="not-found">
            <p>404</p>
            <h1>Page not found</h1>
            <div className="btn-goback">
              <Button
                onClick={() => {
                  navigate("/");
                }}
              >
                Go Back
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PageNotFound;
