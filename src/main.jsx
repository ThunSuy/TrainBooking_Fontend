import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "117145697975-1p3a3i2am7u8f9trl8n3gr24hctm6qo6.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <GlobalStyles>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </GlobalStyles>
    </Router>
  </StrictMode>
);
