import {
  MUSIC_GET_TRENDING,
  MUSIC_GET_TRENDING_FAILED,
  MUSIC_GET_ROMANTIC_VIDEOS,
  MUSIC_GET_PLAYLIST_FAILED,
  CHANGE_CURRENT_PAGE,
} from "../musicTypes";

export default (state, action) => {
  switch (action.type) {
    case MUSIC_GET_TRENDING:
      return {
        ...state,
        trending: action.payload,
      };
    case MUSIC_GET_ROMANTIC_VIDEOS:
      return {
        ...state,
        romantic: action.payload,
      };
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case MUSIC_GET_TRENDING_FAILED:
    case MUSIC_GET_PLAYLIST_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
