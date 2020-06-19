import React, { Fragment } from "react";
import { leftScroll, rightScroll } from "./../../utils/scroll";

export const MovieCardArea = ({ movieData, heading, release, name, area }) => {
  return (
    <Fragment>
      {heading && <h3 className="heading ml-3">{heading}</h3>}
      <div className="container-fluid mt-3 cast_list search_providers_list">
        <div className="row">
          <div
            className="col-1 left-arrow"
            onClick={(event) => leftScroll(event, area)}
          >
            <i className="fas fa-angle-left" aria-hidden="true"></i>
          </div>
          <div className={`col-10 items startMovies ${area || ""}`}>
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
                          <div className="release_date">
                            {movie.release_date}
                          </div>
                        )}
                        {name && (
                          <div className="name">
                            {movie.title || movie.name}
                          </div>
                        )}
                      </div>
                    )}
                  </Fragment>
                ))}
            </div>
          </div>
          <div
            className="col-1 right-arrow"
            onClick={(event) => rightScroll(event, area)}
          >
            <i className="fas fa-angle-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
