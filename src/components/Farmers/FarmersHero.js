import React from "react";
import FarmersFilter from "./FarmersFilter";

export default function FarmersHero({ originalCards, setFarmerCards }) {
  return (
    <div className="hero">
      <div className="container">
        <h1>Restaurant Catalog</h1>
        <h2>Search {originalCards.length || 56}+ Restaurants By Ingredients</h2>
        <FarmersFilter
          originalCards={originalCards}
          setFarmerCards={setFarmerCards}
        />
      </div>
    </div>
  );
}
