import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StartState from "./context/start/StartState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import WatchlistState from "./context/watchlist/WatchlistState";
import MusicState from "./context/music/MusicState";
// import { NavBar } from "./components/common/NavBar";
import { DashBoard } from "./components/layout/DashBoard";
import { Search } from "./components/layout/Search";
import "./css/style.css";
import SearchState from "./context/search/SearchState";
import { SingleTitle } from "./components/common/SingleTitle";
import { SeasonSingleTitle } from "./components/common/SeasonSingleTitle";
import { PrivateRoute } from "./components/routing/PrivateRoute";
import { WatchList } from "./components/layout/WatchList";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { More } from "./components/layout/More";
import setAuthToken from "./utils/setAuthToken";
import { Alerts } from "./components/common/Alerts";
import { Music } from "./components/music/Music";
import BottomNav from "./components/common/BottomNav";
import ScrollToTop from "./components/routing/ScrollToTop";

if (localStorage.token) setAuthToken(localStorage.token);

function App() {
  return (
    <AuthState>
      <AlertState>
        <WatchlistState>
          <StartState>
            <SearchState>
              <MusicState>
                <Router>
                  <Fragment>
                    {/* <NavBar /> */}
                    <BottomNav />
                    <Alerts />
                    <ScrollToTop>
                      <Switch>
                        <Route exact path="/" component={DashBoard} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/music" component={Music} />
                        <Route
                          exact
                          path="/:type/:id"
                          component={SingleTitle}
                        />
                        <Route
                          exact
                          path="/:type/:id/:season_id"
                          component={SeasonSingleTitle}
                        />
                        <PrivateRoute
                          exact
                          path="/mylist"
                          component={WatchList}
                        />
                        <PrivateRoute exact path="/more" component={More} />
                      </Switch>
                    </ScrollToTop>
                  </Fragment>
                </Router>
              </MusicState>
            </SearchState>
          </StartState>
        </WatchlistState>
      </AlertState>
    </AuthState>
  );
}

export default App;
