import React from "react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="call-to-action section">
      <div className="container">
        <div className="row text-center text-md-left">
          <div className="col-12 col-md-6 pb-4">
            <h1 className="section-heading">
              <span className="underline--magical">Farmers</span>
            </h1>
            <p>
              After viewing a curated list of nearby restaurants and the
              ingredients that each restaurant needs, farmers can reach out to
              local restaurants via our automated Twilio SMS system and strike
              deals with restaurant owners over text. In short,{" "}
              <b>Ugli provides farmers with the connections they need</b> to
              gain a customer base and make money selling their fresh produce.
            </p>
            <Link to="/farmers" className="button primary">
              Start Selling
            </Link>
          </div>
          <div className="col-12 col-md-6">
            <h1 className="section-heading">
              <span className="underline--magical">Restaurants</span>
            </h1>
            <p>
              Ugli automatically scrapes the cuisine of nearby restaurants off
              the web and converts that cuisine into a list of likely
              ingredients that the restaurant needs. Restaurants also have the
              option to input a picture of their menu, and our OCR algorithm
              converts that menu into a list of ingredients. Then{" "}
              <b>sit back, relax, and wait for cheap produce</b> to show up at
              your doorstep!
            </p>
            <Link to="/restaurants" className="button primary">
              Join the Network
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
