import React, { useState, useContext, useEffect } from "react";
import Spinner from "./../common/Spinner";
import SearchContext from "./../../context/search/searchContext";
import WatchlistContext from "./../../context/watchlist/watchlistContext";
import { FlippingCard } from "../common/FlippingCard";
import { leftScroll, rightScroll } from "./../../utils/scroll";
import { ReleaseYear } from "./../filters/ReleaseYear";
import { Genres } from "../filters/Genres";
import { Filters } from "../filters/Filters";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [load, setLoad] = useState(false);

  const watchlistContext = useContext(WatchlistContext);
  const { getWatchLists } = watchlistContext;

  const searchContext = useContext(SearchContext);
  const {
    setStateQuery,
    setStateYear,
    setStateGenres,
    setStateProviders,
    setStateType,
    getData,
    filters,
    data,
    providers,
    getSingleTitle,
    clearSingleTitle,
    getProviders,
    getGenres,
  } = searchContext;

  const [activeProviders, setActiveProviders] = useState([]);
  const [relYearActive, setRelYearActive] = useState(false);
  const [genresActive, setGenresActive] = useState(false);

  useEffect(() => {
    setActiveProviders(filters.providers);
  }, [filters]);

  useEffect(() => {
    clearSingleTitle();
    getProviders();
    getWatchLists();
    getGenres();
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  });

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = (side) => (
    <div
      className={classes.list + "filters"}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <div className="header">Filters</div>

      <div className="section-header">Release Year</div>
      <ReleaseYear loading={setLoad} drawer={true} />

      <div className="section-header">Genres</div>
      <Genres loading={setLoad} drawer={true} />
    </div>
  );

  const handleKeyDown = async (event) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      setLoad(true);
      setStateQuery(query);
      await getData(
        query,
        filters.providers,
        filters.releaseYear,
        filters.genres,
        filters.type
      );
      setLoad(false);
    }
  };

  const handleProviderData = async (name) => {
    const prevActiveProviders = [...activeProviders];
    let currentProviders = [...activeProviders];

    if (activeProviders.length === 0) {
      setActiveProviders([...activeProviders, name]);
      currentProviders.push(name);
    } else {
      let noDup = false;
      for (const provider of activeProviders)
        if (provider === name) noDup = true;
      if (!noDup) {
        setActiveProviders([...activeProviders, name]);
        currentProviders.push(name);
      }
    }

    if (
      JSON.stringify(prevActiveProviders) !== JSON.stringify(currentProviders)
    ) {
      setLoad(true);
      setStateProviders([...activeProviders, name]);
      await getData(
        filters.query,
        currentProviders,
        filters.releaseYear,
        filters.genres,
        filters.type
      );
      setLoad(false);
    }
  };

  const resetFilters = async () => {
    setGenresActive(false);
    setRelYearActive(false);
    setStateQuery("");
    setStateYear([]);
    setStateGenres([]);
    setStateProviders([]);
    setStateType();
    setLoad(true);
    await getData("", [], [], [], []);
    setLoad(false);
  };

  return (
    <div className="flick_search">
      <div className="search-top container">
        <div className="searchBox">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-search" />
              </span>
            </div>
            <input
              type="text"
              onChange={onChange}
              onKeyDown={handleKeyDown}
              id="search"
              className="form-control"
              placeholder="Search for a show or movie"
              aria-label="Search for a show or movie"
              aria-describedby="basic-addon1"
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className="container-fluid mt-3 search_providers_list">
            <div className="row">
              <div className="col-1 left-arrow" onClick={leftScroll}>
                <i className="fas fa-angle-left" aria-hidden="true"></i>
              </div>
              <div className="col-10 items">
                {providers &&
                  providers.map((provider) => (
                    <div
                      className={`item ${
                        activeProviders.includes(provider.short_name)
                          ? "active"
                          : ""
                      }`}
                      key={provider.id}
                      onClick={() => handleProviderData(provider.short_name)}
                    >
                      <img
                        className="search_provider"
                        src={provider.icon_url}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
              <div className="col-1 right-arrow" onClick={rightScroll}>
                <i className="fas fa-angle-right" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
        <Filters
          set={{
            relYear: [relYearActive, setRelYearActive],
            genres: [genresActive, setGenresActive],
          }}
          loading={setLoad}
          toggleDrawer={toggleDrawer}
        />
        <div className="reset" onClick={resetFilters}>
          <div className="label-icon">
            <i className="fas fa-times" />
          </div>
          <div className="label-text">
            <span>Reset</span>
          </div>
        </div>
        <div className="filters">
          {relYearActive && <ReleaseYear loading={setLoad} />}
          {genresActive && <Genres loading={setLoad} />}
        </div>
      </div>
      <div className="search-bottom container">
        <div>
          <SwipeableDrawer
            open={state.left}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {sideList("left")}
          </SwipeableDrawer>
        </div>

        {!load && data && (
          <div className="container search-container">
            <div className="search-area row mb-5">
              {data.length > 0 ? (
                data.map((card) => (
                  <FlippingCard
                    key={Math.random().toString() + card.id}
                    data={card}
                    getSingleTitle={getSingleTitle}
                  />
                ))
              ) : (
                <div className="list-empty-msg">
                  No data available with that name
                </div>
              )}
            </div>
          </div>
        )}

        {load && <Spinner />}
      </div>
    </div>
  );
};
