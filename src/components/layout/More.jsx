import React, { useContext, useEffect, useState, Fragment } from "react";
import AuthContext from "./../../context/auth/authContext";
import WatchlistContext from "./../../context/watchlist/watchlistContext";
import { AboutModal } from "./../common/AboutModal";

export const More = props => {
  const authContext = useContext(AuthContext);
  const watchlistContext = useContext(WatchlistContext);

  const { loadUser, user, logout } = authContext;
  const { clearWatchList } = watchlistContext;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const logoutUser = () => {
    logout();
    clearWatchList();
    props.history.push("/");
  };

  return (
    <Fragment>
      <div className="logo">flick</div>
      {user && (
        <div className="more">
          <div className="user-area">
            <div className="user-icon">
              <img src={user.icon} alt="" />
            </div>
            <div className="user-name">
              <div className="mb-0 name">{user.name}</div>
              <div className="mb-0 email">{user.email}</div>
            </div>
          </div>
          <div className="menu">
            <div className="option btn-outline-dark" onClick={logoutUser}>
              <i className="fas fa-sign-out-alt"></i>
              <p className="mb-0 option-text">Logout</p>
            </div>
            <div className="option btn-outline-dark" onClick={handleShow}>
              <i className="fas fa-info-circle"></i>
              <p className="mb-0 option-text">About</p>
            </div>
          </div>
        </div>
      )}
      <AboutModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};
