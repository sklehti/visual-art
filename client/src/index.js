import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import showroomReducer from "./reducers/showroomReducer";

const store = configureStore({
  reducer: {
    showroom: showroomReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
