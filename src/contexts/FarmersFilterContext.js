import React, { createContext, useState } from "react";

export const FarmersFilterContext = createContext();

const FarmersFilterContextProvider = (props) => {
  const [farmerCards, setFarmerCards] = useState([]);

  return (
    <FarmersFilterContext.Provider
      value={{
        farmerCards: farmerCards,
        setFarmerCards: setFarmerCards,
      }}
    >
      {props.children}
    </FarmersFilterContext.Provider>
  );
};

export default FarmersFilterContextProvider;
