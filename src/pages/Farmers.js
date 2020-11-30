import React, { useEffect, useContext, useState } from "react";
import FarmersCards from "../components/Farmers/FarmersCards";
import FarmersHero from "../components/Farmers/FarmersHero";
import { FarmersFilterContext } from "../contexts/FarmersFilterContext";
import { db } from "../data/firebase";

export default function Farmers() {
  const { setFarmerCards } = useContext(FarmersFilterContext);

  const [originalCards, setOriginalCards] = useState([]);

  useEffect(() => {
    db.collection("Restaurants")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setOriginalCards(data);
        setFarmerCards(data);
      });
  }, [setFarmerCards]);

  return (
    <div className="farmers page">
      <FarmersHero
        originalCards={originalCards}
        setFarmerCards={setFarmerCards}
      />
      <FarmersCards />
    </div>
  );
}
