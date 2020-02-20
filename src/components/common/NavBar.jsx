import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="mobile-bottom-nav">
      <Link
        to="/"
        className="mobile-bottom-nav__item mobile-bottom-nav__item--active"
      >
        <div className="mobile-bottom-nav__item-content">
          <i className="fas fa-home mb-1"></i>
          Home
        </div>
      </Link>
      <Link to="/search" className="mobile-bottom-nav__item">
        <div className="mobile-bottom-nav__item-content">
          <i className="fas fa-search mb-1"></i>
          Search
        </div>
      </Link>
      <Link to="/mylist" className="mobile-bottom-nav__item">
        <div className="mobile-bottom-nav__item-content">
          <i className="fas fa-check mb-1"></i>
          My List
        </div>
      </Link>

      <Link to="/more" className="mobile-bottom-nav__item">
        <div className="mobile-bottom-nav__item-content">
          <i className="fas fa-bars mb-1"></i>
          More
        </div>
      </Link>
    </nav>
  );
};
