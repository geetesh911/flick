import React, { Fragment } from "react";
// import { MovieCardArea } from "./MovieCardArea";
import { RecommendationCard } from "./RecommendationCard";

export const Recommendation = ({ singleTitle }) => {
  return (
    <Fragment>
      <p className="title-text">Recommendations</p>
      <div className="recommendations m-auto">
        <RecommendationCard
          movieData={singleTitle.recommendation}
          name={true}
          area="recommendation"
        />
      </div>
    </Fragment>
  );
};
