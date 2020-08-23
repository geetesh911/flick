import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CardMedia from "@material-ui/core/CardMedia";
import { rightScroll } from "../../../utils/scroll";
import { leftScroll } from "./../../../utils/scroll";

export const HomeSections = ({ items, classes, heading }) => {
  const scrollLeft = (e, div) => {
    leftScroll(e, div);
  };

  const scrollRight = (e, div) => {
    rightScroll(e, div);
  };
  return (
    <div className="home-section">
      <div className="section-heading">{heading}</div>

      <div className="left-scroll" onClick={(e) => scrollLeft(e, "trending")}>
        <ArrowBackIosOutlinedIcon />
      </div>

      <div className="section-content trending">
        {items.map((item) => (
          <Card className={classes.root} key={item.snippet.title}>
            <CardActionArea>
              <div className="parent">
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="190"
                  image={item.snippet.thumbnails.high.url}
                  title="Contemplative Reptile"
                />
                <div className="overlay"></div>
                <div className="hover-overlay"></div>
                <div className="play">
                  <PlayArrowIcon />
                </div>
              </div>
              {/* <CardContent> */}
              <div className="song-name">{item.snippet.title}</div>
              {/* </CardContent> */}
            </CardActionArea>
          </Card>
        ))}
      </div>

      <div className="right-scroll" onClick={(e) => scrollRight(e, "trending")}>
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};
