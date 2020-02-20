import {
  GET_UPCOMING_MOVIES_FAILED,
  GET_UPCOMING_MOVIES,
  GET_TOP_RATED_MOVIES_FAILED,
  GET_TOP_RATED_MOVIES,
  GET_TRENDING_MOVIES_FAILED,
  GET_TRENDING_MOVIES
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case GET_UPCOMING_MOVIES:
      return {
        ...state,
        upcomingMovies: action.payload
      };
    case GET_TOP_RATED_MOVIES:
      return {
        ...state,
        topRatedMovies: action.payload
      };
    case GET_TRENDING_MOVIES:
      return {
        ...state,
        trendingMovies: action.payload
      };
    case GET_UPCOMING_MOVIES_FAILED:
    case GET_TOP_RATED_MOVIES_FAILED:
    case GET_TRENDING_MOVIES_FAILED:
      return {
        ...state,
        error: action.payload
      };

    default:
      return {
        ...state
      };
  }
};
