import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PlaylistSection } from "../common/PlaylistSection";
import playlists from "../../../utils/music/playlists.json";

const useStyles = makeStyles({
  root: {
    width: "345px",
    overflow: "unset",
    marginRight: "20px",
  },
});

export const Home = () => {
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  return (
    <div className="music-home-main-section container">
      {/* <HomeSections classes={classes} items={items} heading="Trending" /> */}
      {playlists.map((playlist) => (
        <PlaylistSection
          key={playlist.className}
          classes={classes}
          items={playlist.data}
          heading={playlist.playlistTitle}
          className={playlist.className}
        />
      ))}
    </div>
  );
};
