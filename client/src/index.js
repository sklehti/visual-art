import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import showroomReducer from "./reducers/showroomReducer";
import adminReducer from "./reducers/adminReducer";
import loggingValidateReducer from "./reducers/loggingValidateReducer";
import imageUploadReducer from "./reducers/imageUploadReducer";
import pageViewReducer from "./reducers/pageViewReducer";

const store = configureStore({
  reducer: {
    showroom: showroomReducer,
    admin: adminReducer,
    loggingValidated: loggingValidateReducer,
    imageUpload: imageUploadReducer,
    pageView: pageViewReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
