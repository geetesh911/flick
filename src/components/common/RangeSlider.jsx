import React, { useState, useContext } from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { MuiRail, MuiHandle, MuiTrack } from "./SliderHelper";
import SearchContext from "./../../context/search/searchContext";

export const RangeSlider = ({ loading }) => {
  const searchContext = useContext(SearchContext);
  const { getData, filters, setStateYear } = searchContext;

  const currentYear = new Date().getFullYear();
  const initialValues =
    filters.releaseYear.length > 0 ? filters.releaseYear : [1900, currentYear];

  const [domain] = useState([1900, currentYear]);
  const [values, setValues] = useState([...initialValues]);
  const [update, setUpdate] = useState([...initialValues]);

  const onUpdate = (update) => {
    setUpdate(update);
  };

  const onChange = async (values) => {
    setValues(values);
    setStateYear(values);
    loading(true);
    await getData(
      filters.query,
      filters.providers,
      values,
      filters.genres,
      filters.type
    );
    loading(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2 val">{update[0]}</div>
        <div className="col-8">
          <div style={{ margin: "4% 0 0 ", height: 120, width: "100%" }}>
            <Slider
              mode={2}
              step={1}
              domain={domain}
              rootStyle={{
                position: "relative",
                width: "100%",
              }}
              onUpdate={onUpdate}
              onChange={onChange}
              values={values}
            >
              <Rail>
                {({ getRailProps }) => <MuiRail getRailProps={getRailProps} />}
              </Rail>
              <Handles>
                {({ handles, getHandleProps }) => (
                  <div className="slider-handles">
                    {handles.map((handle) => (
                      <MuiHandle
                        key={handle.id}
                        handle={handle}
                        domain={domain}
                        getHandleProps={getHandleProps}
                      />
                    ))}
                  </div>
                )}
              </Handles>
              <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                  <div className="slider-tracks">
                    {tracks.map(({ id, source, target }) => (
                      <MuiTrack
                        key={id}
                        source={source}
                        target={target}
                        getTrackProps={getTrackProps}
                      />
                    ))}
                  </div>
                )}
              </Tracks>
            </Slider>
          </div>
        </div>
        <div className="col-2 val">{update[1]}</div>
      </div>
    </div>
  );
};
