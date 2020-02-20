import React from "react";
import { Link } from "react-router-dom";

export const Seasons = ({ singleTitle, getSeason }) => {
  return (
    <div className="seasons">
      {singleTitle &&
        singleTitle.seasons &&
        singleTitle.seasons.map(season => (
          <div className="season-poster" key={season.id}>
            <Link
              to={`/${singleTitle.object_type}/${singleTitle.id}/${season.id}`}
              onClick={() => getSeason(season.id)}
            >
              <img src={season.poster} alt="" />
            </Link>
            <div className="badge badge-info season-title-badge">
              {season.title}
            </div>
          </div>
        ))}
    </div>
  );
};
