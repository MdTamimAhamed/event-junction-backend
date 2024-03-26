import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { EventContextProvider } from "./context/EventContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <EventContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EventContextProvider>
);
