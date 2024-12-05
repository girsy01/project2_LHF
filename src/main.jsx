import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { MediaProvider } from "./contexts/MediaContext.jsx";
import { FilterWrapper } from "./contexts/FilterContext.jsx";
import { AuthWrapper } from "./contexts/AuthContext.jsx";
import { MessageWrapper } from "./contexts/MessageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthWrapper>
        <MessageWrapper>
          <MediaProvider>
            <FilterWrapper>
              <App />
            </FilterWrapper>
          </MediaProvider>
        </MessageWrapper>
      </AuthWrapper>
    </Router>
  </StrictMode>
);
