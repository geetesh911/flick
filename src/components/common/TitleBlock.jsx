import React from "react";

export const TitleBlock = ({ singleTitle, season }) => {
  return (
    <div className="title-block">
      {!season && (
        <h1>
          {singleTitle.title}
          <span className="text-muted">
            {" "}
            ({singleTitle.original_release_year})
          </span>
        </h1>
      )}
      {season && (
        <h1>
          <span className="text-muted" style={{ fontSize: "25px" }}>
            {singleTitle.title}
            {` - `}
          </span>
          {season}
          <span className="text-muted">
            {" "}
            ({singleTitle.original_release_year})
          </span>
        </h1>
      )}
      {!season && (
        <h3 className="d-none d-lg-block d-md-block">
          Original Title: {singleTitle.original_title}
        </h3>
      )}
    </div>
  );
};
