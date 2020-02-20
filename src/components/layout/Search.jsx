import React, { useState, useContext, useEffect } from "react";
import { SearchCardItem } from "../cards/SearchCardItem";
import Spinner from "./../common/Spinner";
import SearchContext from "./../../context/search/searchContext";

export const Search = () => {
  const [query, setQuery] = useState("");

  const searchContext = useContext(SearchContext);
  const {
    getData,
    data,
    loading,
    getSingleTitle,
    clearSingleTitle
  } = searchContext;

  useEffect(() => {
    clearSingleTitle();
    //eslint-disable-next-line
  }, []);

  const onChange = e => {
    setQuery(e.target.value);
  };

  const handleKeyDown = event => {
    const { keyCode } = event;

    if (keyCode === 13) {
      getData(query);
    }
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
          />
        </div>
      </div>

      {!loading && data && (
        <div className="search-area">
          {data.map(card => (
            <SearchCardItem
              key={card.id}
              data={card}
              getSingleTitle={getSingleTitle}
            />
          ))}
        </div>
      )}

      {loading && !data && <Spinner />}
    </div>
  );
};