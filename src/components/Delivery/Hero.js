import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <img src={require("../../assets/logo.png")} alt="logo" />
        <h2>Turning ugly waste into abundant produce.</h2>
        <Link to="/farmers" className="button primary">
          For Farmers
        </Link>
        <br className="d-block d-sm-none" />
        <Link to="/restaurants" className="button primary">
          For Restaurants
        </Link>
      </div>
    </div>
  );
}
