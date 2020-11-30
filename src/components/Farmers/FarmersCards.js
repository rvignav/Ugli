import React, { useContext } from "react";
import { FarmersFilterContext } from "../../contexts/FarmersFilterContext";
import FarmerCard from "./FarmersCard";

export default function FarmersCards() {
  const { farmerCards } = useContext(FarmersFilterContext);

  return (
    <div className="cards container">
      <div className="row no-gutters justify-content-center mb-3">
        {farmerCards &&
          farmerCards.map((card, index) => (
            <FarmerCard
              key={card.name + card.city + index}
              docid={card.name + card.city + index}
              name={card.name}
              city={card.city}
              ingredients={card.ingredients}
            />
          ))}
      </div>
    </div>
  );
}
