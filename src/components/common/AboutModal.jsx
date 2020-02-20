import React from "react";
import { Modal } from "react-bootstrap";

export const AboutModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} className="aboutModal">
      <Modal.Header closeButton className="aboutModal-header">
        <Modal.Title>About</Modal.Title>
      </Modal.Header>
      <Modal.Body className="aboutModal-body">
        Flick is a free streaming guide, designed to help you find where to
        watch you favorite movies and shows online. ... You can use our filters
        to only see certain kinds of offers, and can also choose the streaming
        services you already have to only see content available to you.
      </Modal.Body>
      <Modal.Footer className="aboutModal-footer">
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};
