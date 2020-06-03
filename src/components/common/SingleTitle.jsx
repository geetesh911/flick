import React, { Fragment, useContext, useEffect, useState } from "react";
import SearchContext from "../../context/search/searchContext";
import WatchlistContext from "./../../context/watchlist/watchlistContext";
import providers from "../../utils/providers";
import { Offer } from "./Offer";
import { MoviesDetails } from "./MoviesDetails";
import { Link } from "react-router-dom";
import { Credits } from "./Credits";
import { TitleBlock } from "./TitleBlock";
import { Seasons } from "./Seasons";
import { Clips } from "./Clips";
import { Recommendation } from "./Recommendation";
import { WatchlistButton } from "./WatchlistButton";
import AuthContext from "./../../context/auth/authContext";
import { FlickCarousel } from "./Carousel";
import Spinner from "./Spinner";

export const SingleTitle = (props) => {
  const searchContext = useContext(SearchContext);
  const watchlistContext = useContext(WatchlistContext);
  const authContext = useContext(AuthContext);

  const {
    addWatchList,
    getWatchLists,
    deleteWatchList,
    watchlist,
  } = watchlistContext;
  const { loadUser, user } = authContext;

  const [show, setShow] = useState(false);

  const {
    singleTitle,
    person,
    getSingleTitle,
    getGenres,
    genres,
    getPerson,
    getSeason,
    clearPerson,
    clearSeason,
  } = searchContext;

  const handleClose = () => {
    setShow(false);
    clearPerson();
  };
  const handleShow = (id) => {
    getPerson(id);
    setShow(true);
  };
  useEffect(() => {
    loadUser();
    clearSeason();
    getGenres();
    getSingleTitle(props.match.params.type, props.match.params.id);
    if (user) getWatchLists();
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

  const provider =
    (singleTitle &&
      singleTitle.offers &&
      providers(singleTitle.offers, false)) ||
    [];

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
      {singleTitle ? (
        <Fragment>
          {/* {singleTitle.backdrops && (
            <MyGallery photos={singleTitle.backdrops} />
          )} */}
          {singleTitle.backdrops ? (
            <FlickCarousel singleTitle={singleTitle} />
          ) : (
            <img
              src="https://fundehitus.ee/raua20/wp-content/uploads/2016/12/noimage.gif"
              alt=""
              className="no-image"
            />
          )}
          <Link to="/search">
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
          <div className="container movie">
            <div className="row">
              <div className="col-lg-4 col-lg-pull-8 col-md-4 col-lg-pull-8 d-none d-lg-block d-md-block poster">
                <div className="bookmark-icon">
                  <img src={singleTitle.poster} alt="" />
                  {exist && <i className="fas fa-bookmark"></i>}
                </div>
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
                    <MoviesDetails singleTitle={singleTitle} genres={genres} />
                  </div>
                )}
              </div>
              <div className="col-lg-8 col-lg-push-4 col-md-8 col-lg-push-4 col-sm-12 details">
                {/* TitleBlock */}
                {singleTitle && <TitleBlock singleTitle={singleTitle} />}

                {/* Seasons */}
                {singleTitle && (
                  <Seasons singleTitle={singleTitle} getSeason={getSeason} />
                )}

                {provider.length > 0 && <p className="title-text">Watch Now</p>}
                <div className="offers">
                  <Offer provider={provider} type="flatrate" heading="Stream" />
                  <Offer provider={provider} type="rent" heading="Rent" />
                  <Offer provider={provider} type="buy" heading="Buy" />
                </div>

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
                    singleTitle={singleTitle}
                    handleShow={handleShow}
                    handleClose={handleClose}
                    person={person}
                    show={show}
                  />
                )}
                {singleTitle.short_description && (
                  <p className="title-text">Synopsis</p>
                )}
                <div className="synopsis m-auto">
                  {singleTitle.short_description &&
                    singleTitle.short_description}
                </div>

                {singleTitle && singleTitle.videoSource && (
                  <Fragment>
                    {" "}
                    <p className="title-text">{singleTitle.object_type}</p>
                    <iframe
                      src={singleTitle.videoSource}
                      frameBorder="0"
                      className="videoSource"
                      title={singleTitle.videoSource}
                      allowFullScreen={true}
                      scrolling="no"
                    ></iframe>
                  </Fragment>
                )}

                {singleTitle.recommendation &&
                  singleTitle.recommendation.results.length > 0 && (
                    <Recommendation singleTitle={singleTitle} />
                  )}
                <div className="bookmark-icon">
                  <img
                    src={singleTitle.poster}
                    alt=""
                    className="d-block d-lg-none d-md-none mobile-poster"
                  />
                  {exist && <i className="fas fa-bookmark"></i>}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Spinner />
        </Fragment>
      )}
    </Fragment>
  );
};
