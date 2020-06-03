import React, { useContext } from "react";
import providers from "./../../utils/providers";
import { Link } from "react-router-dom";
import { Ratings } from "../common/Ratings";
import WatchlistContext from "./../../context/watchlist/watchlistContext";

export const SearchCardItem = ({ data, getSingleTitle }) => {
  const watchlistContext = useContext(WatchlistContext);
  const { watchlist } = watchlistContext;

  const {
    title,
    scoring,
    poster,
    original_release_year,
    offers,
    object_type,
    id,
  } = data;

  let imdb = "";
  let rottenTomatoes = "";
  let tmdb = "";

  scoring &&
    scoring.forEach((score) => {
      if (score.provider_type === "imdb:score") imdb = score.value;
      if (score.provider_type === "tomato:meter") rottenTomatoes = score.value;
      if (score.provider_type === "tmdb:score") tmdb = score.value;
    });
  let exist = null;

  watchlist &&
    data &&
    watchlist.length > 0 &&
    watchlist.forEach((list) => {
      if (list.id === id) {
        exist = true;
      }
    });

  const provider = (offers && providers(offers, true)) || [];

  const getTitle = () => {
    getSingleTitle(object_type, id);
  };

  return (
    // <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
    <div className="container searchCard mt-3">
      <div className="card">
        <div className="card-horizontal">
          <div className="img-square-wrapper">
            <div className="bookmark-icon">
              <img className="" src={poster} alt="" />
              {exist && <i className="fas fa-bookmark"></i>}
            </div>
          </div>
          <div className="card-body">
            <h4 className="card-title">
              <Link to={`/${object_type}/${id}`} onClick={getTitle}>
                {title}
              </Link>{" "}
              <span className="year">{original_release_year}</span>
            </h4>
            <div className="card-text mb-4">
              <span className="d-inline-block d-md-none d-lg-none">
                Watch Now
              </span>
              <Link
                to={`/${object_type}/${id}`}
                className="offers d-block d-md-none d-lg-none"
              >
                {provider.length} offers available
              </Link>
              {provider &&
                provider.map((p) => (
                  <a
                    href={p.url}
                    key={p.id}
                    className="d-none d-lg-inline-block d-md-inline-block"
                  >
                    <img src={p.icon} className="provider-icon" alt="" />
                  </a>
                ))}
            </div>
            <Ratings imdb={imdb} rottenTomatoes={rottenTomatoes} tmdb={tmdb} />
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
