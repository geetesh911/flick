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
  SET_GENRES,
  SET_RELEASE_YEAR,
  SET_PROVIDERS,
  SET_QUERY,
  SET_TYPE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        filters: { ...state.filters, query: action.payload },
        loading: false,
      };
    case SET_RELEASE_YEAR:
      return {
        ...state,
        filters: { ...state.filters, releaseYear: action.payload },
        loading: false,
      };
    case SET_PROVIDERS:
      return {
        ...state,
        filters: { ...state.filters, providers: action.payload },
        loading: false,
      };
    case SET_GENRES:
      return {
        ...state,
        filters: { ...state.filters, genres: action.payload },
        loading: false,
      };
    case SET_TYPE:
      return {
        ...state,
        filters: {
          ...state.filters,
          type: action.payload ? [action.payload] : [],
        },
        loading: false,
      };
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
