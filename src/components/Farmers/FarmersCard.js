import React from "react";
import { Link } from "react-router-dom";

export default function FarmersCard({ name, city, ingredients }) {
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="card">
        <div className="card-header">
          <h1>{name}</h1>
          <h2>{titleCase(city.trim())}</h2>
        </div>
        <div className="card-body">
          <p>
            {ingredientsList(ingredients).slice(0, 13).join(", ")}
            <span>, and more</span>
          </p>
          <div className="buttons">
            <Link to="/farmers" className="button primary">
              Contact
            </Link>
            <Link to="/farmers" className="button">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ingredientsList(ingredients) {
  var items = Object.keys(ingredients).map(function (key) {
    return [key, ingredients[key]];
  });

  // Sort the array based on the second element
  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  ingredients = [];

  for (let i = 0; i < items.length; i++) {
    ingredients.push(items[i][0].trim().toLowerCase());
  }

  return ingredients;
}

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}
