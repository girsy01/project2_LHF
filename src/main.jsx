import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { MediaProvider } from "./contexts/MediaContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <MediaProvider>
        <App />
      </MediaProvider>
    </Router>
  </StrictMode>
);
