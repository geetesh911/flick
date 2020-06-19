import React, { Fragment } from "react";
import { Ratings } from "./Ratings";
import { timeConvertor } from "./../../utils/timeConverter";

export const MoviesDetails = ({ singleTitle, genres }) => {
  let imdb = "";
  let rottenTomatoes = "";
  let tmdb = "";

  singleTitle &&
    singleTitle.scoring &&
    singleTitle.scoring.forEach((score) => {
      if (score.provider_type === "imdb:score") imdb = score.value;
      if (score.provider_type === "tomato:meter") rottenTomatoes = score.value;
      if (score.provider_type === "tmdb:score") tmdb = score.value;
    });

  let time = singleTitle && timeConvertor(singleTitle.runtime);
  return (
    <div className="movie-details mt-3">
      {singleTitle.scoring && (
        <div className="rating-details">
          <div className="text d-inline-block movie-details-text">Rating</div>
          <div className="rating">
            <Ratings imdb={imdb} rottenTomatoes={rottenTomatoes} tmdb={tmdb} />
          </div>
        </div>
      )}
      <div className="genres mt-1">
        <div className="text d-inline-block movie-details-text">Genres</div>
        <div className="genres-name">
          {singleTitle.genre_ids &&
            singleTitle.genre_ids.map((genre) => (
              <span key={genre}>{genres[genre - 1].translation}</span>
            ))}
        </div>
      </div>
      {singleTitle.runtime && (
        <div className="runtime mt-1">
          <div className="text d-inline-block movie-details-text">Runtime</div>
          {singleTitle.runtime && time}
        </div>
      )}
      {singleTitle.age_certification && (
        <div className="ageRating mt-1">
          <div className="text d-inline-block movie-details-text">
            Age Rating
          </div>
          {singleTitle.age_certification && singleTitle.age_certification}
        </div>
      )}
      {singleTitle.credits && (
        <div className="director mt-1">
          <div className="text d-inline-block movie-details-text">Director</div>
          {singleTitle.credits &&
            singleTitle.credits.map(
              (credit) =>
                credit.role === "DIRECTOR" && (
                  <Fragment key={credit.person_id}>{credit.name}</Fragment>
                )
            )}
        </div>
      )}
    </div>
  );
};
