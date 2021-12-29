import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

function Navbar() {
  const [user, setUser] = useState({});
  const [menuToggle, setMenuToggle] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleHamburgerMenu = () => {
    setMenuToggle(!menuToggle);
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("app_userId");
    console.log(auth, "user signed out");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </Link>

        <a
          role="button"
          className={`${menuToggle ? "is-active" : ""} navbar-burger`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={handleHamburgerMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`${menuToggle ? "is-active" : ""} navbar-menu`}
      >
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/my-account" className="navbar-item">
                My Account
              </Link>
              <Link to="/my-account/listings" className="navbar-item">
                My Listings
              </Link>
            </>
          ) : (
            <></>
          )}

          {/* <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            More
          </a>
  
          <div className="navbar-dropdown">
            <a className="navbar-item">
              About
            </a>
            <a className="navbar-item">
              Jobs
            </a>
            <a className="navbar-item">
              Contact
            </a>
            <hr className="navbar-divider" />
            <a className="navbar-item">
              Report an issue
            </a>
          </div>
        </div> */}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user ? (
                <Link to="/" className="button is-primary" onClick={logout}>
                  <strong>Logout</strong>
                </Link>
              ) : (
                <Link to="/login" className="button is-primary">
                  <strong>Sign up / Login</strong>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
