import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";

// Page components
import Home from "./pages/Home";
import Farmers from "./pages/Farmers";
import Delivery from "./pages/Delivery";
import Restaurants from "./pages/Restaurants";

// contexts
import FarmersFilterContextProvider from "./contexts/FarmersFilterContext";

function App() {
  // routes
  const routes = [
    { path: "/", Component: <Home /> },
    {
      path: "/farmers",
      Component: (
        <FarmersFilterContextProvider>
          <Farmers />
        </FarmersFilterContextProvider>
      ),
    },
    { path: "/restaurants", Component: <Restaurants /> },
    { path: "/delivery", Component: <Delivery /> }
  ];

  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <div className="App">
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {Component}
            </Route>
          ))}
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
