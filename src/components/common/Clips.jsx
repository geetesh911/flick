import React, { Fragment } from "react";

export const Clips = ({ singleTitle }) => {
  return (
    <Fragment>
      {singleTitle.clips && (
        <p className="title-text">VIDEOS: TRAILERS, TEASERS, FEATURETTES</p>
      )}
      <div className="videos m-auto">
        <div className="row">
          {singleTitle.clips &&
            singleTitle.clips.map((clip) => (
              <div
                className="col-lg-6 col-md-12 col-sm-12"
                key={clip.external_id}
              >
                <div className="col-area">
                  <iframe
                    // width="290"
                    key={clip.external_id}
                    title={clip.name}
                    // height="200"
                    src={clip.external_id}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="mx-1 clip"
                  ></iframe>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};
