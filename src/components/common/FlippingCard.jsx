import React, { useContext, useState, useEffect } from "react";
import providers from "./../../utils/providers";
import { Link } from "react-router-dom";
import { Ratings } from "../common/Ratings";
import WatchlistContext from "./../../context/watchlist/watchlistContext";

export const FlippingCard = ({ data, getSingleTitle }) => {
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
  const [exist, setExist] = useState(false);

  useEffect(() => {
    watchlist &&
      data &&
      watchlist.length > 0 &&
      watchlist.forEach((list) => {
        if (list.id === id) {
          setExist(true);
        }
      });
    // eslint-disable-next-line
  }, []);

  const provider = (offers && providers(offers, true)) || [];

  const getTitle = () => {
    getSingleTitle(object_type, id);
  };

  return (
    <div className="body-wrap mt-4 col-lg-3 col-md-4 col-sm-6">
      <div className="wrapper">
        <div className="card">
          <input
            type="checkbox"
            id={data.id}
            className="more"
            aria-hidden="true"
          />
          <div className="content">
            <div
              className="front"
              // style={{
              //   backgroundImage: `url("${poster}")`,
              // }}
            >
              <div className="inner">
                <Link to={`/${object_type}/${id}`} onClick={getTitle}>
                  <img src={poster} className="posterImg" alt="" />
                </Link>
                <label htmlFor={data.id} className="button" aria-hidden="true">
                  <i className="fas fa-ellipsis-v" />
                </label>
                {exist && (
                  <label
                    htmlFor={data.id}
                    className="bookmark"
                    aria-hidden="true"
                  >
                    {" "}
                    <i className="fas fa-bookmark"></i>
                  </label>
                )}
                {object_type === "show" && <div className="show-label">TV</div>}
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <label htmlFor={data.id} className="button" aria-hidden="true">
                  <i className="fas fa-ellipsis-v" />
                </label>

                <div className="title">
                  {title}
                  <span className="year">{original_release_year}</span>
                </div>
                <div className="offers">
                  {provider &&
                    provider.map((p) => (
                      <a
                        href={p.url}
                        key={p.id}
                        className="d-lg-inline-TitleBlock d-md-inline-block"
                      >
                        <img src={p.icon} className="provider-icon" alt="" />
                      </a>
                    ))}
                </div>
                <div className="rating">
                  <Ratings
                    imdb={imdb}
                    rottenTomatoes={rottenTomatoes}
                    tmdb={tmdb}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
