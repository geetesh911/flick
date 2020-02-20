import React from "react";
import ImageGallery from "react-image-gallery";

const MyGallery = ({ photos }) => {
  let images = [];
  photos.forEach(photo => {
    let obj = {};
    obj.original = photo.backdrop_url;
    images.push(obj);
  });

  if (images.length === 0) {
    let obj = {};
    obj.original =
      "https://fundehitus.ee/raua20/wp-content/uploads/2016/12/noimage.gif";
    images.push(obj);
  }
  return (
    <ImageGallery
      items={images}
      showBullets={true}
      showPlayButton={false}
      showThumbnails={false}
      useBrowserFullscreen={false}
    />
  );
};

export default MyGallery;
