import React from "react";

export const Ratings = ({ imdb, rottenTomatoes, tmdb }) => {
  return (
    <div className="ratings">
      {imdb && (
        <div className="imdb">
          <img
            src="https://www.justwatch.com/appassets/img/imdb-logo.png"
            alt=""
          />
          <p className="rate">{imdb}</p>
        </div>
      )}
      {rottenTomatoes && (
        <div className="rotten-tomatoes d-inline">
          <img
            src="https://www.justwatch.com/appassets/img/rottentomatoes-v2-2.png"
            alt=""
          />
          <p className="d-inline">{rottenTomatoes}%</p>
        </div>
      )}
      {tmdb && (
        <div className="tmdb d-inline">
          <img
            src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
            alt=""
          />
          <p className="d-inline">{tmdb}</p>
        </div>
      )}
    </div>
  );
};
