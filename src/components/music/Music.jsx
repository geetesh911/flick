import React, { useContext } from "react";
import MusicAppBar from "./header/MusicAppBar";
import { Home } from "./sections/Home";
import { Trending } from "./sections/Trending";
import MusicContext from "./../../context/music/musicContext";

export const Music = () => {
  const musicContext = useContext(MusicContext);
  const { currentPage } = musicContext;
  return (
    <div className="music">
      <MusicAppBar />
      {currentPage === "home" && <Home />}
      {currentPage === "trending" && <Trending />}
    </div>
  );
};
