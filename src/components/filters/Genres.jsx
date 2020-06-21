import React, { useContext, useEffect, useState } from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import SearchContext from "../../context/search/searchContext";

export const Genres = ({ loading, drawer }) => {
  const searchContext = useContext(SearchContext);
  const { getData, getGenres, genres, filters, setStateGenres } = searchContext;

  const [activeGernes, setActiveGenres] = useState([]);

  useEffect(() => {
    getGenres();
    setActiveGenres(filters.genres);
    // eslint-disable-next-line
  }, []);

  const handleGenreData = async (name) => {
    const prevActiveGernes = [...activeGernes];
    let currentGenres = [...activeGernes];

    if (activeGernes.length === 0) {
      setActiveGenres([...activeGernes, name]);
      currentGenres.push(name);
    } else {
      let noDup = false;
      for (const provider of activeGernes) if (provider === name) noDup = true;
      if (!noDup) {
        setActiveGenres([...activeGernes, name]);
        currentGenres.push(name);
      }
    }

    if (JSON.stringify(prevActiveGernes) !== JSON.stringify(currentGenres)) {
      loading(true);
      setStateGenres([...activeGernes, name]);
      await getData(
        filters.query,
        filters.providers,
        filters.releaseYear,
        currentGenres,
        filters.type
      );
      loading(false);
    }
  };

  return (
    <div className={`fil_genres ${drawer ? "fil_drawer_genres" : ""}`}>
      <ArrowDropUpIcon />
      <div className="genres">
        <div className="filter-heading">Genres</div>
        <div className="genres-items">
          {genres &&
            genres.map((genre) => (
              <div
                className={`genre-item ${
                  activeGernes.includes(genre.short_name) ? "active" : ""
                }`}
                key={genre.short_name}
                onClick={() => handleGenreData(genre.short_name)}
              >
                <div className="item">
                  <div className="label-icon">
                    <i className="fas fa-check" />
                  </div>
                  <div className="label-text">
                    <span>{genre.technical_name}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
