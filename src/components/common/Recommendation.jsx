import React, { Fragment } from "react";
import { MovieCardArea } from "./MovieCardArea";

export const Recommendation = ({ singleTitle }) => {
  return (
    <Fragment>
      <p className="title-text">Recommendations</p>
      <div className="recommendations m-auto">
        <MovieCardArea movieData={singleTitle.recommendation} name={true} />
      </div>
    </Fragment>
  );
};
