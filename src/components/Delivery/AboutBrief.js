import React from "react";
import { Link } from "react-router-dom";

export default function AboutBrief() {
  return (
    <div className="about-brief section">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-lg-7 text-center text-lg-left">
            <h1 className="section-heading">
              <span className="underline--magical">
                162,000,
                <br className="d-sm-none d-block" />
                000,000
              </span>
            </h1>
            <p>
              The amount, in dollars, of <b>food wasted every year</b>. To solve
              this problem, Ugli revolutionizes the way fresh produce is sold by
              local farmers. We <b>link farmers and local restaurant owners</b>{" "}
              to help farmers sell cosmetically imperfect ingredients or
              ingredients in high supply at a reduced price.
            </p>
            
          </div>
          <div className="pt-4 pt-sm-3 pt-0 col-11 col-sm-9 col-lg-5 row align-content-center m-auto justify-content-center">
            <img
              src={require("../../assets/home/carrots.jpg")}
              alt="carrots"
              className="img-fluid img-thumbnail"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
