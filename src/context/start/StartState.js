import React, { useReducer } from "react";
import StartContext from "./startContext";
import startReducer from "./startReducer";

import {
  GET_UPCOMING_MOVIES,
  GET_TOP_RATED_MOVIES,
  GET_UPCOMING_MOVIES_FAILED,
  GET_TOP_RATED_MOVIES_FAILED,
  GET_TRENDING_MOVIES,
  GET_TRENDING_MOVIES_FAILED,
} from "../types";

const { TMDB_API_KEY } = process.env;

let API_URL = "";

if (process.env.NODE_ENV === "production") {
  API_URL = "https://flick-movie-api.herokuapp.com";
} else {
  API_URL = "http://localhost:5000";
}

const StartState = (props) => {
  const initialState = {
    upcomingMovies: null,
    topRatedMovies: null,
    trendingMovies: null,
    error: null,
  };

  const [state, dispatch] = useReducer(startReducer, initialState);

  // get upcoming movies
  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=IN`
      );

      const res = await data.json();

      res.results.forEach((result) => {
        result.poster_path = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${result.poster_path}`;
      });
      dispatch({ type: GET_UPCOMING_MOVIES, payload: res });
    } catch (err) {
      dispatch({ type: GET_UPCOMING_MOVIES_FAILED, payload: err.response });
    }
  };
  const getTopRatedMovies = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en&page=1&region=IN`
      );

      const res = await data.json();

      res.results.forEach((result) => {
        result.poster_path = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${result.poster_path}`;
      });

      dispatch({ type: GET_TOP_RATED_MOVIES, payload: res });
    } catch (err) {
      dispatch({
        type: GET_TOP_RATED_MOVIES_FAILED,
        payload: err.response,
      });
    }
  };

  const getTrendingMovies = async () => {
    try {
      // const data = await fetch(
      //   `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`
      // );
      const res = await fetch(`${API_URL}/api/start/popular`);

      const data = await res.json();

      data.items.forEach((searchResult) => {
        if (searchResult.poster) {
          searchResult.poster = `https://images.justwatch.com${searchResult.poster}`;
          let splittedPosterURL = searchResult.poster.split("/");
          splittedPosterURL[splittedPosterURL.length - 1] = "s592";
          searchResult.poster = splittedPosterURL.join("/");
        }
      });

      // res.results.forEach(result => {
      //   result.poster_path = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${result.poster_path}`;
      // });

      dispatch({ type: GET_TRENDING_MOVIES, payload: data });
    } catch (err) {
      dispatch({
        type: GET_TRENDING_MOVIES_FAILED,
        payload: err.response,
      });
    }
  };

  return (
    <StartContext.Provider
      value={{
        upcomingMovies: state.upcomingMovies,
        topRatedMovies: state.topRatedMovies,
        trendingMovies: state.trendingMovies,
        error: state.error,
        getUpcomingMovies,
        getTopRatedMovies,
        getTrendingMovies,
      }}
    >
      {props.children}
    </StartContext.Provider>
  );
};

export default StartState;
