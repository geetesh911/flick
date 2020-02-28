import React, { useReducer } from "react";
import SearchContext from "./searchContext";
import searchReducer from "./searchReducer";
import Axios from "axios";
import {
  SEARCH,
  SEARCH_FAILED,
  SINGLE_TITLE,
  SINGLE_TITLE_FAILED,
  CLEAR_SINGLE_TITLE,
  GET_GENRES_FAILED,
  GET_GENRES,
  GET_PERSON,
  CLEAR_PERSON,
  GET_PERSON_FAILED,
  GET_SEASON,
  GET_SEASON_FAILED,
  CLEAR_SEASON
} from "./../types";

const API_URL = "https://flick-movie-api.herokuapp.com";

const SearchState = props => {
  const initialState = {
    data: null,
    error: null,
    singleTitle: null,
    genres: null,
    person: null,
    season: null,
    loading: false
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  // get searched movies
  const getData = async query => {
    try {
      const res = await Axios.get(`${API_URL}/api/search?q=${query}`);

      res.data.items.forEach(searchResult => {
        if (searchResult.poster) {
          searchResult.poster = `https://images.justwatch.com${searchResult.poster}`;
          let splittedPosterURL = searchResult.poster.split("/");
          splittedPosterURL[splittedPosterURL.length - 1] = "s592";
          searchResult.poster = splittedPosterURL.join("/");
        }
      });

      dispatch({ type: SEARCH, payload: res.data.items });
    } catch (err) {
      dispatch({ type: SEARCH_FAILED, payload: err.response.msg });
    }
  };

  const getSingleTitle = async (type, id, ip) => {
    ip = await ip;
    try {
      const res = await Axios.get(
        `${API_URL}/api/title?ctype=${type}&title_id=${id}&ipAdd=${ip}`
      );

      dispatch({ type: SINGLE_TITLE, payload: res.data });
    } catch (err) {
      dispatch({ type: SINGLE_TITLE_FAILED, payload: err.response.msg });
    }
  };

  const clearSingleTitle = () => {
    dispatch({ type: CLEAR_SINGLE_TITLE });
  };

  const getGenres = async (type, id) => {
    try {
      const res = await Axios.get(`${API_URL}/api/genres`);

      dispatch({ type: GET_GENRES, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_GENRES_FAILED, payload: err.response.msg });
    }
  };

  const getPerson = async id => {
    try {
      const res = await Axios.get(`${API_URL}/api/person?person_id=${id}`);

      dispatch({ type: GET_PERSON, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_PERSON_FAILED, payload: err.response.msg });
    }
  };

  const clearPerson = () => {
    dispatch({ type: CLEAR_PERSON });
  };

  const getSeason = async (id, ip) => {
    ip = await ip;
    try {
      const res = await Axios.get(
        `${API_URL}/api/season?season_id=${id}&ipAdd=${ip}`
      );

      dispatch({ type: GET_SEASON, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_SEASON_FAILED, payload: err.response.msg });
    }
  };

  const clearSeason = () => {
    dispatch({ type: CLEAR_SEASON });
  };

  return (
    <SearchContext.Provider
      value={{
        data: state.data,
        singleTitle: state.singleTitle,
        genres: state.genres,
        person: state.person,
        error: state.error,
        season: state.season,
        loading: state.loading,
        getData,
        getSingleTitle,
        getGenres,
        getPerson,
        getSeason,
        clearPerson,
        clearSeason,
        clearSingleTitle
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
