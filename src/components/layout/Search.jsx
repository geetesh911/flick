import React, { useState, useContext, useEffect } from "react";
// import { SearchCardItem } from "../cards/SearchCardItem";
import Spinner from "./../common/Spinner";
import SearchContext from "./../../context/search/searchContext";
import WatchlistContext from "./../../context/watchlist/watchlistContext";
import { FlippingCard } from "../common/FlippingCard";
import { leftScroll, rightScroll } from "./../../utils/scroll";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [load, setLoad] = useState(false);
  const [activeProviders, setActiveProviders] = useState([]);

  const watchlistContext = useContext(WatchlistContext);
  const { getWatchLists } = watchlistContext;

  const searchContext = useContext(SearchContext);
  const {
    getData,
    data,
    providers,
    getSingleTitle,
    clearSingleTitle,
    getProviders,
    getProviderData,
  } = searchContext;

  useEffect(() => {
    clearSingleTitle();
    getProviders();
    getWatchLists();
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = async (event) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      setLoad(true);
      await getData(query);
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
      sendRequest();
      setLoad(true);
      await getProviderData(currentProviders.join(","));
      setLoad(false);
    }
  };

  const sendRequest = () => {};

  return (
    <div className="search container">
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

      {!load && data && (
        <div className="container search-container">
          <div className="search-area row mb-5">
            {data.length > 0 ? (
              data.map((card) => (
                // <SearchCardItem
                //   key={card.id}
                //   data={card}
                //   getSingleTitle={getSingleTitle}
                // />
                <FlippingCard
                  key={card.id}
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

      {/* <FlippingCard /> */}

      {load && <Spinner />}
    </div>
  );
};
