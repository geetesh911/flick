import React from "react";
import { Carousel } from "react-bootstrap";

export const FlickCarousel = singleTitle => {
  return (
    <Carousel>
      {singleTitle &&
        singleTitle.singleTitle.backdrops.map(backdrop => (
          <Carousel.Item key={backdrop.backdrop_url}>
            <img
              className="d-block w-100"
              src={backdrop.backdrop_url}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
};
