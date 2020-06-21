import React, { Fragment, useContext } from "react";
import SearchContext from "./../../context/search/searchContext";
import { Link } from "react-router-dom";

export const DashboardList = ({ movieData }) => {
  const searchContext = useContext(SearchContext);
  const { getSingleTitle } = searchContext;

  const getTitle = (object_type, id) => {
    getSingleTitle(object_type, id);
  };
  return (
    <div className="dashboardList">
      {movieData &&
        movieData.items.map((movie) => (
          <Fragment key={movie.id}>
            {movie && (
              <div className="poster list_item">
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
                    // height="200px"
                    // width="150px"
                    className=""
                  />
                </Link>

                {/* {release && (
                  <div className="release_date">{movie.release_date}</div>
                )} */}
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
  );
};
