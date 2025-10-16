import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import store from "./store/store";
import { initializeEvents } from "./store/eventsSlice";
import { initializeRegistrations } from "./store/registrationsSlice";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

store.dispatch(initializeEvents());
store.dispatch(initializeRegistrations());
