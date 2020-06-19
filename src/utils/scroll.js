import $ from "jquery";

export const leftScroll = (event, className) => {
  event.preventDefault();
  className = className ? `.${className}` : ".items";
  $(className).animate(
    {
      scrollLeft: "-=700px",
    },
    "slow"
  );
};

export const rightScroll = (event, className) => {
  event.preventDefault();
  className = className ? `.${className}` : ".items";
  $(className).animate(
    {
      scrollLeft: "+=700px",
    },
    "slow"
  );
};
