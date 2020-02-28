import React, { Fragment } from "react";

const Spinner = () => {
  return (
    <Fragment>
      <div className="spinner-body">
        <div className="spinner-border text-light spinner" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </Fragment>
  );
};

export default Spinner;
