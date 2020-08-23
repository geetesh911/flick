import React, { useReducer } from "react";
import MusicContext from "./musicContext";
import musicReducer from "./musicReducer";
import {
  MUSIC_GET_TRENDING,
  MUSIC_GET_TRENDING_FAILED,
  MUSIC_GET_ROMANTIC_VIDEOS,
  MUSIC_GET_PLAYLIST_FAILED,
  CHANGE_CURRENT_PAGE,
} from "../musicTypes";
import axClient from "../../utils/music/youtubeSearch";

const MusicState = (props) => {
  const initialState = {
    trending: [],
    currentPage: "home",
    error: null,
  };

  const [state, dispatch] = useReducer(musicReducer, initialState);

  const getTrendingVideos = async () => {
    try {
      const res = await axClient.get("videos", {
        params: {
          chart: "mostPopular",
          maxResults: "10",
          regionCode: "IN",
        },
      });
      dispatch({ type: MUSIC_GET_TRENDING, payload: res.data.items });
    } catch (err) {
      dispatch({ type: MUSIC_GET_TRENDING_FAILED, payload: err.response });
    }
  };

  const getPlaylistVideos = async (id, type) => {
    try {
      const res = await axClient.get("playlistItems", {
        params: {
          playlistId: id,
          maxResults: 20,
        },
      });
      if (type === "romantic")
        dispatch({ type: MUSIC_GET_ROMANTIC_VIDEOS, payload: res.data.items });
    } catch (err) {
      dispatch({ type: MUSIC_GET_PLAYLIST_FAILED, payload: err.response });
    }
  };

  const changeCurrentPage = (page) => {
    dispatch({ type: CHANGE_CURRENT_PAGE, payload: page });
  };

  return (
    <MusicContext.Provider
      value={{
        trending: state.trending,
        currentPage: state.currentPage,
        error: state.error,
        getTrendingVideos,
        getPlaylistVideos,
        changeCurrentPage,
      }}
    >
      {props.children}
    </MusicContext.Provider>
  );
};

export default MusicState;
