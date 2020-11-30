import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import $ from "jquery";

export default function Header() {
  const path = useLocation().pathname; // to determine which is active

  useEffect(() => {
    // clicking outside the navbar closes it
    $(document).ready(() => {
      $(document).click(function (event) {
        var click = $(event.target);
        var _open =
          $(".navbar-collapse").hasClass("show") &&
          !$(".nav-item").hasClass("show");
        if (_open === true && !click.hasClass("navbar-toggler")) {
          $(".navbar-toggler").click();
        }
      });
    });
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h1 id="navlogotext">
              <img src={require("../assets/logo-light.png")} alt="logo" />
            </h1>
          </Link>
          {/* Hamburger Menu for collapse */}
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ml-auto">
              <li className={"nav-item " + (path === "/" && "active")}>
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className={"nav-item " + (path === "/about" && "active")}>
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className={"nav-item " + (path === "/farmers" && "active")}>
                <Link className="nav-link" to="/farmers">
                  For Farmers
                </Link>
              </li>
              <li
                className={"nav-item " + (path === "/restaurants" && "active")}
              >
                <Link className="nav-link" to="/restaurants">
                  For Restaurants
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Demo
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a
                    className="dropdown-item"
                    href="https://www.youtube.com/watch?v=ju1yQEDYIGE&feature=youtu.be&t=9"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Video
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    href="https://www.beautiful.ai/player/-M4jwZFtvLl_CdaBXRxB/Ugli-Pitch-Deck"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Slides
                  </a>
                  <a
                    className="dropdown-item"
                    href="https://www.youtube.com/watch?v=Ts2JLvSOabs&feature=youtu.be"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Pitch
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
