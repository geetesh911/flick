import React, { useReducer } from "react";
import WatchlistContext from "./watchlistContext";
import watchlistReducer from "./watchlistReducer";
import Axios from "axios";
import {
  ADD_WATCHLIST,
  ADD_WATCHLIST_FAILED,
  GET_WATCHLIST,
  GET_WATCHLIST_FAILED,
  DELETE_WATCHLIST,
  DELETE_WATCHLIST_FAILED,
  CLEAR_WATCHLIST,
} from "../types";

let API_URL = "";

if (process.env.NODE_ENV === "production") {
  API_URL = "https://flick-movie-api.herokuapp.com";
} else {
  API_URL = "http://localhost:5000";
}

const WatchlistState = (props) => {
  const initialState = {
    watchlist: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(watchlistReducer, initialState);

  const getWatchLists = async () => {
    try {
      const res = await Axios.get(`${API_URL}/api/watchlist`);
      dispatch({ type: GET_WATCHLIST, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_WATCHLIST_FAILED, payload: err.response.data.msg });
    }
  };

  const addWatchList = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await Axios.post(`${API_URL}/api/watchlist`, data, config);
      dispatch({ type: ADD_WATCHLIST, payload: res.data });
    } catch (err) {
      dispatch({ type: ADD_WATCHLIST_FAILED, payload: err.response });
    }
  };

  const clearWatchList = () => {
    dispatch({ type: CLEAR_WATCHLIST });
  };

  const deleteWatchList = async (id) => {
    try {
      await Axios.delete(`${API_URL}/api/watchlist/${id}`);

      dispatch({ type: DELETE_WATCHLIST, payload: id });
    } catch (err) {
      dispatch({ type: DELETE_WATCHLIST_FAILED, payload: err.response });
    }
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist: state.watchlist,
        loading: state.loading,
        error: state.error,
        getWatchLists,
        addWatchList,
        deleteWatchList,
        clearWatchList,
      }}
    >
      {props.children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistState;
