import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { FilterWrapper } from "./context/FilterContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FilterWrapper>
      <Router>
        <App />
      </Router>
    </FilterWrapper>
  </StrictMode>
);
