import React, { Fragment } from "react";
import { Offer } from "./Offer";
import { timeConvertor } from "./../../utils/timeConverter";

export const Episodes = ({ data, provider, videoSource }) => {
  const arrowReverse = id => {
    document.getElementById(`down-${id}`).classList.toggle("d-none");
    document.getElementById(`up-${id}`).classList.toggle("d-none");
  };

  return (
    <Fragment>
      <p className="title-text">{data.length} Episodes</p>
      <div className="accordion" id="accordionExample">
        {data &&
          data.map(episode => (
            <div className="card" key={episode.id}>
              <button
                className="btn btn-link"
                type="button"
                onClick={() => arrowReverse(episode.id)}
                data-toggle="collapse"
                data-target={`#collapse${episode.id}`}
                aria-expanded="true"
                aria-controls={`collapse${episode.id}`}
              >
                <div className="card-header" id="headingOne">
                  <p className="mb-0">
                    <span className="season-number">
                      S{episode.season_number} E{episode.episode_number}{" "}
                    </span>
                    <span className="season-title">{episode.title}</span>
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"
                          id={`down-${episode.id}`}
                        />
                        <path
                          d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
                          className="d-none"
                          id={`up-${episode.id}`}
                        />
                      </svg>
                    </span>
                  </p>
                </div>
              </button>

              <div
                id={`collapse${episode.id}`}
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  <p className="text">
                    Duration: {timeConvertor(episode.runtime)}
                  </p>
                  {episode.short_description}
                  <div className="offers">
                    <Offer
                      provider={provider}
                      type="flatrate"
                      heading="Stream"
                    />
                    <Offer provider={provider} type="rent" heading="Rent" />
                    <Offer provider={provider} type="buy" heading="Buy" />
                  </div>
                  <div className="episode-video">
                    <p className="title-text">EPISODE:</p>
                    <iframe
                      src={`${videoSource}&e=${episode.episode_number}`}
                      frameBorder="0"
                      className="videoSource"
                      title={videoSource}
                      allowFullScreen={true}
                      scrolling="no"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};
