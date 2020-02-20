import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { PersonModal } from "./PersonModal";

export const Credits = ({
  singleTitle,
  handleShow,
  handleClose,
  person,
  show
}) => {
  return (
    <Fragment>
      {singleTitle.cast && <p className="title-text">Cast</p>}

      <div className="cast m-auto">
        {/* <div className="card-group"> */}
        {singleTitle.cast &&
          singleTitle.cast.cast.map(credit => (
            <div className="card" key={credit.id}>
              <img
                src={
                  credit.profile_path ||
                  `data:image/jpeg;base64,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`
                }
                className="card-img-top"
                alt="..."
                height="172.46px"
                width="136px"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {" "}
                  <Link to="#!" onClick={() => handleShow(credit.id)}>
                    {credit.name}
                  </Link>
                </h5>
                <p className="card-text tooltip-test" title={credit.character}>
                  {credit.character || "...."}
                </p>
              </div>
            </div>
          ))}
        {person && (
          <PersonModal person={person} handleClose={handleClose} show={show} />
        )}
        {/* </div> */}
      </div>
    </Fragment>
  );
};
