import React, { useContext, useEffect } from "react";
import StartContext from "./../../context/start/startContext";
import { MovieCardArea } from "./../common/MovieCardArea";
import tv from "../../flick-images/tv.png";

export const DashBoard = () => {
  const startContext = useContext(StartContext);
  const {
    getUpcomingMovies,
    getTopRatedMovies,
    getTrendingMovies,
    upcomingMovies,
    topRatedMovies,
    trendingMovies
  } = startContext;
  useEffect(() => {
    getUpcomingMovies();
    getTopRatedMovies();
    getTrendingMovies();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="logo">flick</div>
        <div className="row">
          <div className="col-xl-5 col-lg-5 col-md-0 col-sm-0 dashboard-area dashboard-tagline d-none d-lg-block">
            <div className="dashboard-text">
              Be choosy when you have choices!
            </div>
            <p className="upcoming">Upcoming Movies</p>
            <div className="bottomDIV">
              <MovieCardArea
                movieData={upcomingMovies}
                // heading="Upcoming Movies"
              />
            </div>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 dashboard-area dashboard-tv">
            <img src={tv} alt="" className="d-none d-lg-block dashboard-tv" />
            <div className="tv-tagline d-none">
              Be choosy when you have choices!
            </div>
          </div>
          <div className="mobile-bottomDIV d-none">
            <MovieCardArea
              movieData={upcomingMovies}
              heading="Upcoming Movies"
              release={true}
            />
          </div>
        </div>
        <div className="movieData">
          <MovieCardArea movieData={trendingMovies} heading="Trending" />
          <MovieCardArea
            movieData={topRatedMovies}
            heading="Top Rated Movies"
          />
        </div>
      </div>
    </div>
  );
};
