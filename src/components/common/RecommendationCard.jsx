import React, { Fragment, useContext } from "react";
import { leftScroll, rightScroll } from "./../../utils/scroll";
import SearchContext from "./../../context/search/searchContext";
import { Link } from "react-router-dom";

export const RecommendationCard = ({
  movieData,
  heading,
  release,
  // name,
  area,
}) => {
  const searchContext = useContext(SearchContext);
  const { getSingleTitle } = searchContext;

  const getTitle = (object_type, id) => {
    getSingleTitle(object_type, id);
  };
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
                movieData.items.map((movie) => (
                  <Fragment key={movie.id}>
                    {movie && (
                      <div className="d-inline-block mr-3 poster">
                        <Link
                          to={`/${movie.object_type}/${movie.id}`}
                          onClick={() => getTitle(movie.object_type, movie.id)}
                        >
                          <img
                            src={
                              movie.poster ||
                              `https://media.comicbook.com/files/img/default-movie.png`
                            }
                            alt=""
                            height="200px"
                            width="150px"
                            className=""
                          />
                        </Link>

                        {release && (
                          <div className="release_date">
                            {movie.release_date}
                          </div>
                        )}
                        {/* {name && (
                          <div className="name">
                            {movie.title || movie.name}
                          </div>
                        )} */}
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
