import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";

// Page components
import Home from "./pages/Home";
import About from "./pages/About";
import Farmers from "./pages/Farmers";
import Restaurants from "./pages/Restaurants";

// contexts
import FarmersFilterContextProvider from "./contexts/FarmersFilterContext";

function App() {
  // routes
  const routes = [
    { path: "/", Component: <Home /> },
    { path: "/about", Component: <About /> },
    {
      path: "/farmers",
      Component: (
        <FarmersFilterContextProvider>
          <Farmers />
        </FarmersFilterContextProvider>
      ),
    },
    { path: "/restaurants", Component: <Restaurants /> },
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
