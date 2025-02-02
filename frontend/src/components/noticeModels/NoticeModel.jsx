import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./notic.scss";
import { useNavigate } from "react-router-dom";

const NoticeModel = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="model-notice"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            THUNDERBOLTS CUP
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="noti-model-body">
          <h4>SAVE YOUR SPOT</h4>
          <p>Register for Upcomming THUNDERBOLTS Cup</p>
          <Button
            onClick={() => {
              navigate("/register-thunderbolts-cup");
            }}
          >
            RESGISTER NOW
          </Button>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default NoticeModel;
