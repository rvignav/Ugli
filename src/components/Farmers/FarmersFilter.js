import React from "react";

export default function FarmersFilter({ originalCards, setFarmerCards }) {
  return (
    <div className="filter">
      <input
        type="text"
        className="filter-input ingredient form-control"
        placeholder="Search by ingredient..."
        onChange={(e) => {
          filterByIngredients(
            e.target.value.toLowerCase().trim(),
            originalCards,
            setFarmerCards
          );
        }}
      />
      <input
        type="text"
        className="filter-input city form-control"
        placeholder="Search by city..."
        onChange={(e) => {
          filterByCity(
            e.target.value.toLowerCase().trim(),
            originalCards,
            setFarmerCards
          );
        }}
      />
    </div>
  );
}

function filterByIngredients(filterText, originalCards, setFarmerCards) {
  setFarmerCards(
    originalCards.filter((card) => {
      const ingredients = Object.keys(card.ingredients);
      for (let i = 0; i < ingredients.length; i++)
        if (ingredients[i].toLowerCase().includes(filterText)) return true;
      return false;
    })
  );
}

function filterByCity(filterText, originalCards, setFarmerCards) {
  setFarmerCards(
    originalCards.filter((card) => {
      if (card.city.toLowerCase().includes(filterText)) return true;
      return false;
    })
  );
}
