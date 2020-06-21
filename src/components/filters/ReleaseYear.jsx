import React from "react";
import { RangeSlider } from "../common/RangeSlider";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

export const ReleaseYear = ({ loading, drawer }) => {
  return (
    <div className={`fil_release-year ${drawer ? "fil_drawer_relYear" : ""}`}>
      {!drawer && <ArrowDropUpIcon />}
      <div className="release-year">
        <div className="filter-heading">Release Year</div>
        <div className="slider">
          <RangeSlider loading={loading} />
        </div>
      </div>
    </div>
  );
};
