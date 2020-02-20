import React, { useState } from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";

export const PersonModal = ({ person, handleClose, show }) => {
  const [key, setKey] = useState("info");
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
      <Modal.Header closeButton className="personModal-header">
        <Modal.Title>
          {person && person.name}
          {/* <p className="dob">{person.birthday}</p> */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="personModal-body">
        <div className="image">
          <img src={person.profile_path} alt="" />
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={k => setKey(k)}
        >
          <Tab eventKey="info" title="Info">
            <div className="detials d-inline-block">
              <div>
                <strong>Known For:</strong>
                <span className="person-info">
                  {" "}
                  {person.known_for_department}
                </span>
              </div>
              <div>
                <strong>Gender:</strong>{" "}
                <span className="person-info">
                  {person.gender === 2 ? "Male" : "Female"}
                </span>
              </div>
              <div>
                <strong>D.O.B:</strong>
                <span className="person-info">
                  {" "}
                  {person.birthday ? person.birthday : "-"}
                </span>
              </div>
              <div>
                <strong>Place of Birth:</strong>
                <span className="person-info">
                  {" "}
                  {person.place_of_birth ? person.place_of_birth : "-"}
                </span>
              </div>
              <div>
                <strong>Official Website:</strong>
                <span className="person-info">
                  {" "}
                  {person.homepage ? (
                    <a href={person.homepage}>{person.homepage}</a>
                  ) : (
                    "-"
                  )}
                </span>
              </div>
            </div>
          </Tab>
          <Tab eventKey="biography" title="Biography">
            {person.biography}
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer className="personModal-footer"></Modal.Footer>
    </Modal>
  );
};
