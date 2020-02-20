import React, { Fragment } from "react";

export const Offer = ({ provider, heading, type }) => {
  let render = false;
  provider.forEach(p => {
    if (p.type === type) render = true;
  });
  return (
    <Fragment>
      {render && (
        <div className="offer">
          <div className={`offer_category ${type}`}>{heading}</div>
          <div className="provider">
            {provider.map(
              offer =>
                offer.type === type && (
                  <a
                    href={offer.url}
                    key={offer.url}
                    className="d-inline-block mr-2"
                  >
                    <img src={offer.icon} className="provider-icon" alt="" />
                  </a>
                )
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};
