import React, { useState, useContext, useEffect } from "react";
import { SearchCardItem } from "../cards/SearchCardItem";
import Spinner from "./../common/Spinner";
import SearchContext from "./../../context/search/searchContext";
import $ from "jquery";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [load, setLoad] = useState(false);
  const [activeProvider, setActiveProvider] = useState("");

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

  const leftScroll = (event) => {
    event.preventDefault();
    $(`.items`).animate(
      {
        scrollLeft: "-=900px",
      },
      "slow"
    );
  };

  const rightScroll = (event) => {
    event.preventDefault();
    $(`.items`).animate(
      {
        scrollLeft: "+=900px",
      },
      "slow"
    );
  };

  const handleProviderData = async (name) => {
    setActiveProvider(name);
    setLoad(true);
    await getProviderData(name);
    setLoad(false);
  };

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
                    activeProvider === provider.short_name ? "active" : ""
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

      {!load && data && (
        <div className="search-area">
          {data.length > 0 ? (
            data.map((card) => (
              <SearchCardItem
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
      )}

      {load && <Spinner />}
    </div>
  );
};
