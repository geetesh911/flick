import React, { useContext, useEffect } from "react";
import WatchlistContext from "./../../context/watchlist/watchlistContext";
import SearchContext from "./../../context/search/searchContext";
import { SearchCardItem } from "../cards/SearchCardItem";
import AuthContext from "./../../context/auth/authContext";

export const WatchList = props => {
  const watchlistContext = useContext(WatchlistContext);
  const searchContext = useContext(SearchContext);
  const authContext = useContext(AuthContext);

  const { loadUser, user } = authContext;
  const { getWatchLists, watchlist } = watchlistContext;
  const { getSingleTitle } = searchContext;

  useEffect(() => {
    loadUser();
    if (user) getWatchLists();
    //eslint-disable-next-line
  }, []);

  if (!user) props.history.push("/login");

  return (
    <div className="search-area">
      <div className="title-bar">My List</div>
      {watchlist.length > 0 &&
        watchlist.map(list => (
          <SearchCardItem
            data={list}
            key={list.id}
            getSingleTitle={getSingleTitle}
          />
        ))}
    </div>
  );
};
