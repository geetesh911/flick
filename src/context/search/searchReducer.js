import {
  SEARCH,
  SEARCH_FAILED,
  SINGLE_TITLE,
  SINGLE_TITLE_FAILED,
  CLEAR_SINGLE_TITLE,
  GET_GENRES,
  GET_GENRES_FAILED,
  GET_PERSON,
  CLEAR_PERSON,
  GET_PERSON_FAILED,
  GET_SEASON,
  GET_SEASON_FAILED,
  GET_PROVIDERS,
  GET_PROVIDERS_FAILED,
  GET_PROVIDER_DATA,
  GET_PROVIDER_DATA_FAILED,
  CLEAR_SEASON,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case SINGLE_TITLE:
      return {
        ...state,
        singleTitle: action.payload,
        loading: false,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
        loading: false,
      };
    case GET_PERSON:
      return {
        ...state,
        person: action.payload,
        loading: false,
      };
    case GET_SEASON:
      return {
        ...state,
        season: action.payload,
        loading: false,
      };
    case GET_PROVIDERS:
      return {
        ...state,
        providers: action.payload,
        loading: false,
      };
    case GET_PROVIDER_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case CLEAR_SINGLE_TITLE:
      return {
        ...state,
        singleTitle: null,
        loading: false,
      };
    case CLEAR_PERSON:
      return {
        ...state,
        person: null,
        loading: false,
      };
    case CLEAR_SEASON:
      return {
        ...state,
        season: null,
        loading: false,
      };
    case SEARCH_FAILED:
    case SINGLE_TITLE_FAILED:
    case GET_GENRES_FAILED:
    case GET_PERSON_FAILED:
    case GET_SEASON_FAILED:
    case GET_PROVIDERS_FAILED:
    case GET_PROVIDER_DATA_FAILED:
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
