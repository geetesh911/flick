import React, {
  Fragment,
  cloneElement,
  useEffect,
  useState,
  useContext,
} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import $ from "jquery";
import MusicContext from "./../../../context/music/musicContext";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function MusicAppBar(props) {
  const musicContext = useContext(MusicContext);
  const { currentPage, changeCurrentPage } = musicContext;

  useEffect(() => {
    $("body").scroll(function () {
      var scroll = $("body").scrollTop();
      if (scroll > 10) {
        $(".MuiAppBar-colorPrimary").css("background-color", "#151515");
        $(".MuiAppBar-colorPrimary").css("transition", "all 0.5s ease-in-out");
        // $(".MuiAppBar-colorPrimary").css("marginTop", "0px");
      } else {
        $(".MuiAppBar-colorPrimary").css("background-color", "transparent");
        $(".MuiAppBar-colorPrimary").css("transition", "all 0.5s ease-in-out");
        // $(".MuiAppBar-colorPrimary").css("marginTop", "10px");
      }
    });

    // eslint-disable-next-line
  }, []);

  const [search, setSearch] = useState("");
  const [searchBarShow, setSearchBarShow] = useState(false);

  const showSearchBar = () => {
    setSearchBarShow(true);
  };

  const hideSearchBar = () => {
    setSearchBarShow(false);
  };

  const clearSearchBar = (e) => {
    setSearch("");
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const displayHome = () => {
    changeCurrentPage("home");
  };

  const displayTrending = () => {
    changeCurrentPage("trending");
  };

  return (
    <Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar style={{ backgroundColor: "transparent" }}>
          <Toolbar>
            <Typography variant="h6">flick</Typography>
            {!searchBarShow && (
              <div className="menu">
                <div
                  className={`menu-item ${
                    currentPage === "home" ? "active" : ""
                  }`}
                  onClick={displayHome}
                >
                  <span className="mobile">
                    <HomeRoundedIcon />
                  </span>

                  <span className="desktop">Home</span>
                </div>
                <div
                  className={`menu-item ${
                    currentPage === "trending" ? "active" : ""
                  }`}
                  onClick={displayTrending}
                >
                  <span className="mobile">
                    <WhatshotIcon />
                  </span>
                  <span className="desktop">Hotlist</span>
                </div>
                <div className="menu-item" onClick={showSearchBar}>
                  <SearchIcon />
                </div>
              </div>
            )}
            {searchBarShow && (
              <div className="input-group">
                <div className="input-group-prepend" onClick={hideSearchBar}>
                  <span className="input-group-text" id="basic-addon1">
                    <ArrowBackIcon />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control music-search-input"
                  placeholder="Search"
                  value={search}
                  onChange={onChange}
                  autoFocus
                />
                <div className="input-group-append" onClick={clearSearchBar}>
                  <span className="input-group-text">
                    <CloseIcon />
                  </span>
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </Fragment>
  );
}
