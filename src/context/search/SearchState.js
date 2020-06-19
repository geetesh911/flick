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
  CLEAR_SEASON,
  GET_PROVIDERS,
  GET_PROVIDERS_FAILED,
  GET_PROVIDER_DATA,
  GET_PROVIDER_DATA_FAILED,
} from "./../types";
import getIP from "./../../utils/getIP";

let API_URL = "";
let PY_API_URL = "";

if (process.env.NODE_ENV === "production") {
  API_URL = "https://flick-movie-api.herokuapp.com";
} else {
  API_URL = "http://localhost:5000";
}

if (process.env.NODE_ENV === "production") {
  PY_API_URL = "https://flick-py-api.herokuapp.com";
} else {
  PY_API_URL = "http://localhost:8000";
}

const SearchState = (props) => {
  const initialState = {
    data: null,
    error: null,
    singleTitle: null,
    providers: null,
    genres: null,
    person: null,
    season: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  // get searched movies
  const getData = async (query) => {
    try {
      const res = await fetch(`${PY_API_URL}/api/search/${query}`);
      const data = await res.json();

      data.items.forEach((searchResult) => {
        if (searchResult.poster) {
          searchResult.poster = `https://images.justwatch.com${searchResult.poster}`;
          let splittedPosterURL = searchResult.poster.split("/");
          splittedPosterURL[splittedPosterURL.length - 1] = "s592";
          searchResult.poster = splittedPosterURL.join("/");
        }
      });

      dispatch({ type: SEARCH, payload: data.items });
    } catch (err) {
      dispatch({ type: SEARCH_FAILED, payload: err.response });
    }
  };

  // get searched movies
  const getProviderData = async (name) => {
    try {
      const res = await fetch(`${PY_API_URL}/api/getProviderData/${name}`);
      const data = await res.json();

      data.items.forEach((searchResult) => {
        if (searchResult.poster) {
          searchResult.poster = `https://images.justwatch.com${searchResult.poster}`;
          let splittedPosterURL = searchResult.poster.split("/");
          splittedPosterURL[splittedPosterURL.length - 1] = "s592";
          searchResult.poster = splittedPosterURL.join("/");
        }
      });

      dispatch({ type: GET_PROVIDER_DATA, payload: data.items });
    } catch (err) {
      dispatch({ type: GET_PROVIDER_DATA_FAILED, payload: err.response });
    }
  };

  // get searched movies
  const getProviders = async () => {
    try {
      const res = await fetch(`${PY_API_URL}/api/getProviders`);
      let data = await res.json();

      data = data.filter((provider) => {
        if (provider.id === 124 || provider.id === 100 || provider.id === 283)
          return false;
        return provider;
      });

      data.forEach((searchResult) => {
        if (searchResult.icon_url) {
          searchResult.icon_url = `https://images.justwatch.com${searchResult.icon_url}`;
          let splittedIconURL = searchResult.icon_url.split("/");
          splittedIconURL[splittedIconURL.length - 1] = "s100";
          searchResult.icon_url = splittedIconURL.join("/");
        }
      });

      dispatch({ type: GET_PROVIDERS, payload: data });
    } catch (err) {
      dispatch({ type: GET_PROVIDERS_FAILED, payload: err.response });
    }
  };

  const getSingleTitle = async (type, id) => {
    const ip = await getIP();
    try {
      const res = await Axios.get(
        `${API_URL}/api/title?ctype=${type}&title_id=${id}&ipAdd=${ip}`
      );

      dispatch({ type: SINGLE_TITLE, payload: res.data });
    } catch (err) {
      dispatch({ type: SINGLE_TITLE_FAILED, payload: err.response });
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
      dispatch({ type: GET_GENRES_FAILED, payload: err.response });
    }
  };

  const getPerson = async (id) => {
    try {
      const res = await Axios.get(`${API_URL}/api/person?person_id=${id}`);

      dispatch({ type: GET_PERSON, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_PERSON_FAILED, payload: err.response });
    }
  };

  const clearPerson = () => {
    dispatch({ type: CLEAR_PERSON });
  };

  const getSeason = async (id) => {
    const ip = await getIP();
    try {
      const res = await Axios.get(
        `${API_URL}/api/season?season_id=${id}&ipAdd=${ip}`
      );

      dispatch({ type: GET_SEASON, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_SEASON_FAILED, payload: err.response });
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
        providers: state.providers,
        error: state.error,
        season: state.season,
        loading: state.loading,
        getData,
        getSingleTitle,
        getGenres,
        getPerson,
        getSeason,
        getProviders,
        getProviderData,
        clearPerson,
        clearSeason,
        clearSingleTitle,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
