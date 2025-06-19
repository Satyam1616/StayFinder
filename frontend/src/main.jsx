import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ScrollProvider } from "./context/ScrollContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollProvider>
        {" "}
        <AuthProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </AuthProvider>
      </ScrollProvider>
    </BrowserRouter>
  </StrictMode>
);
