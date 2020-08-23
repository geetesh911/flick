import React, { useEffect } from "react";
import songs from "../header/songs.json";
import { makeStyles } from "@material-ui/core/styles";
import { HomeSections } from "../common/HomeSections";

const useStyles = makeStyles({
  root: {
    width: "345px",
    overflow: "unset",
    marginRight: "20px",
  },
});

export const Trending = () => {
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  const items = songs.items;

  return (
    <div className="music-home-main-section container">
      <HomeSections classes={classes} items={items} heading="Trending" />
    </div>
  );
};
