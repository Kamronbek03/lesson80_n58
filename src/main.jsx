import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./Store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AppProvider } from "./AppContext.jsx"; // AppProvider importi

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>
);
