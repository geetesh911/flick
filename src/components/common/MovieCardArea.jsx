import React, { Fragment } from "react";

export const MovieCardArea = ({ movieData, heading, release, name }) => {
  return (
    <Fragment>
      {heading && <h3 className="heading ml-3">{heading}</h3>}
      <div className="startMovies">
        <div className="startMovies-content">
          {movieData &&
            movieData.results.map((movie) => (
              <Fragment key={movie.id}>
                {movie && (
                  <div className="d-inline-block mr-3 poster">
                    <img
                      src={
                        movie.poster_path ||
                        `https://media.comicbook.com/files/img/default-movie.png`
                      }
                      alt=""
                      height="200px"
                      width="150px"
                      className=""
                    />

                    {release && (
                      <div className="release_date">{movie.release_date}</div>
                    )}
                    {name && (
                      <div className="name">{movie.title || movie.name}</div>
                    )}
                  </div>
                )}
              </Fragment>
            ))}
        </div>
      </div>
    </Fragment>
  );
};
