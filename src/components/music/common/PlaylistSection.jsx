import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import CardMedia from "@material-ui/core/CardMedia";
import { rightScroll } from "../../../utils/scroll";
import { leftScroll } from "./../../../utils/scroll";

export const PlaylistSection = ({ items, classes, heading, className }) => {
  const scrollLeft = (e, div) => {
    leftScroll(e, div);
  };

  const scrollRight = (e, div) => {
    rightScroll(e, div);
  };
  return (
    <div className="home-section playlist">
      <div className="section-heading">{heading}</div>

      <div className="left-scroll" onClick={(e) => scrollLeft(e, className)}>
        <ArrowBackIosOutlinedIcon />
      </div>

      <div className={`section-content ${className}`}>
        {items.map((item) => (
          <Card className={classes.root} key={item.title}>
            <CardActionArea>
              <div className="parent">
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  image={item.thumbnailURL}
                  title="Contemplative Reptile"
                />
                <div className="overlay"></div>
                <div className="hover-overlay"></div>
              </div>

              <div className="song-name">{item.title}</div>
              <div className="type">Playlist</div>
            </CardActionArea>
          </Card>
        ))}
      </div>

      <div className="right-scroll" onClick={(e) => scrollRight(e, className)}>
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};
