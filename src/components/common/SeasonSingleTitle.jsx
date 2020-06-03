import React, { Fragment, useContext, useEffect, useState } from "react";
import SearchContext from "../../context/search/searchContext";
import WatchlistContext from "./../../context/watchlist/watchlistContext";
import AuthContext from "./../../context/auth/authContext";
import providers from "../../utils/providers";
import { Offer } from "./Offer";
import { MoviesDetails } from "./MoviesDetails";
import { Link } from "react-router-dom";
import { Credits } from "./Credits";
import { TitleBlock } from "./TitleBlock";
import { Clips } from "./Clips";
import { Episodes } from "./Episodes";
import { WatchlistButton } from "./WatchlistButton";
import { FlickCarousel } from "./Carousel";
import Spinner from "./Spinner";

export const SeasonSingleTitle = (props) => {
  const searchContext = useContext(SearchContext);
  const watchlistContext = useContext(WatchlistContext);
  const authContext = useContext(AuthContext);

  const { loadUser, user } = authContext;

  const {
    addWatchList,
    getWatchLists,
    deleteWatchList,
    watchlist,
  } = watchlistContext;

  const [show, setShow] = useState(false);

  const {
    singleTitle,
    person,
    getGenres,
    getSeason,
    getSingleTitle,
    genres,
    getPerson,
    clearPerson,
    season,
  } = searchContext;

  const handleClose = () => {
    clearPerson();
    setShow(false);
  };
  const handleShow = (id) => {
    getPerson(id);
    setShow(true);
  };
  useEffect(() => {
    loadUser();
    getSingleTitle(props.match.params.type, props.match.params.id);
    getSeason(props.match.params.season_id);
    getGenres();
    getWatchLists();
    //eslint-disable-next-line
  }, []);

  let exist = false;
  let existID = null;

  watchlist &&
    user &&
    singleTitle &&
    watchlist.length > 0 &&
    watchlist.forEach((list) => {
      if (list.id === singleTitle.id) {
        exist = true;
        existID = list._id;
      }
    });

  const provider = (season && providers(season.offers, false)) || [];

  const goBack = () => {
    props.history.goBack();
  };
  const addMylist = () => {
    const {
      id,
      title,
      poster,
      scoring,
      offers,
      original_release_year,
      object_type,
    } = singleTitle;

    const watchlistData = {
      id,
      title,
      poster,
      scoring,
      offers,
      original_release_year,
      object_type,
    };
    if (user) addWatchList(watchlistData);
    else props.history.push("/login");
  };

  const deleteMylist = () => {
    if (user) deleteWatchList(existID);
    else props.history.push("/login");
  };

  return (
    <Fragment>
      {season && singleTitle ? (
        <Fragment>
          {season.backdrops && <FlickCarousel singleTitle={season} />}
          <Link to="#!" onClick={goBack}>
            <div className="back d-block d-lg-none d-md-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="back-icon"
                viewBox="0 0 18 18"
              >
                <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" />
              </svg>
            </div>
          </Link>
          <div className="container movie season">
            <div className="row">
              <div className="col-lg-4 col-lg-pull-8 col-md-4 col-lg-pull-8 d-none d-lg-block d-md-block poster">
                <img src={season.poster} alt="" />
                {watchlist && !exist && (
                  <WatchlistButton
                    addMylist={addMylist}
                    classes={"d-none d-lg-block"}
                  />
                )}
                {watchlist && exist && (
                  <WatchlistButton
                    deleteMylist={deleteMylist}
                    classes={"d-none d-lg-block"}
                  />
                )}
                {singleTitle && (
                  <div className="d-none d-lg-block">
                    <MoviesDetails singleTitle={season} genres={genres} />
                  </div>
                )}
              </div>
              <div className="col-lg-8 col-lg-push-4 col-md-8 col-lg-push-4 col-sm-12 details">
                {/* TitleBlock */}
                {singleTitle && (
                  <TitleBlock singleTitle={singleTitle} season={season.title} />
                )}

                {provider.length > 0 && <p className="title-text">Watch Now</p>}
                <div className="offers">
                  <Offer provider={provider} type="flatrate" heading="Stream" />
                  <Offer provider={provider} type="rent" heading="Rent" />
                  <Offer provider={provider} type="buy" heading="Buy" />
                </div>

                {season.episodes && (
                  <div className="d-block">
                    <Episodes
                      data={season.episodes}
                      videoSource={season.videoSource}
                      provider={provider}
                    />
                  </div>
                )}

                {watchlist && !exist && (
                  <WatchlistButton
                    addMylist={addMylist}
                    classes={"d-block d-lg-none"}
                  />
                )}
                {watchlist && exist && (
                  <WatchlistButton
                    deleteMylist={deleteMylist}
                    classes={"d-block d-lg-none"}
                  />
                )}

                {singleTitle && <Clips singleTitle={singleTitle} />}
                {singleTitle && (
                  <div className="d-block d-lg-none">
                    <MoviesDetails singleTitle={singleTitle} genres={genres} />
                  </div>
                )}
                {singleTitle && (
                  <Credits
                    singleTitle={season}
                    handleShow={handleShow}
                    handleClose={handleClose}
                    person={person}
                    show={show}
                  />
                )}
                {season.short_description && (
                  <p className="title-text">Synopsis</p>
                )}
                <div className="synopsis m-auto">
                  {season.short_description && season.short_description}
                </div>
                <img
                  src={season.poster}
                  alt=""
                  className="d-block d-lg-none d-md-none mobile-poster"
                />
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
