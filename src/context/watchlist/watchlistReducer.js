import {
  GET_WATCHLIST_FAILED,
  GET_WATCHLIST,
  ADD_WATCHLIST,
  ADD_WATCHLIST_FAILED,
  DELETE_WATCHLIST,
  CLEAR_WATCHLIST
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_WATCHLIST:
      return {
        ...state,
        watchlist: action.payload,
        loading: false
      };

    case ADD_WATCHLIST:
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
        loading: false
      };
    case DELETE_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(list => list._id !== action.payload),
        loading: false
      };
    case CLEAR_WATCHLIST:
      console.log("run");
      return {
        ...state,
        watchlist: []
      };
    case GET_WATCHLIST_FAILED:
    case ADD_WATCHLIST_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
