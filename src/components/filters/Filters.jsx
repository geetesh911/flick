import React, { useContext } from "react";
import SearchContext from "../../context/search/searchContext";

export const Filters = ({ set, loading, toggleDrawer }) => {
  const searchContext = useContext(SearchContext);
  const { filters, setStateType, getData } = searchContext;

  const setActive = (e, val, setter, other) => {
    other.forEach((o) => {
      o[1](false);
    });
    if (!val) setter(true);
    else setter(false);
  };
  const setType = async (type) => {
    setStateType(type);
    loading(true);
    await getData(
      filters.query,
      filters.providers,
      filters.releaseYear,
      filters.genres,
      type ? [type] : null
    );
    loading(false);
  };

  return (
    <div className="filter-strip">
      <div className="content-type">
        <button
          className={`item ${filters.type.length === 0 ? "active" : ""}`}
          onClick={() => setType("")}
        >
          All
        </button>
        <button
          className={`item ${filters.type[0] === "movie" ? "active" : ""}`}
          onClick={() => setType("movie")}
        >
          Movies
        </button>
        <button
          className={`item ${filters.type[0] === "show" ? "active" : ""}`}
          onClick={() => setType("show")}
        >
          Shows
        </button>
      </div>
      <div className="filter-label filter-label-lg">
        <div className="label-icon">
          <i className="fas fa-filter" />
        </div>
        <div className="label-text">
          <span>Filters</span>
        </div>
      </div>
      <div
        className="filter-label filter-label-sm"
        onClick={toggleDrawer("left", true)}
      >
        <div className="label-icon">
          <i className="fas fa-filter" />
        </div>
        <div className="label-text">
          <span>Filters</span>
        </div>
      </div>
      <div className="main-filters">
        <button
          className={`release-year item ${
            set.relYear[0] || filters.releaseYear.length > 0 ? "active" : ""
          }`}
          onClick={(e) =>
            setActive(e, set.relYear[0], set.relYear[1], [set.genres])
          }
        >
          Release Year
        </button>
        <button
          className={`genres item ${
            set.genres[0] || filters.genres.length > 0 ? "active" : ""
          }`}
          onClick={(e) =>
            setActive(e, set.genres[0], set.genres[1], [set.relYear])
          }
        >
          Genres
        </button>
      </div>
    </div>
  );
};
