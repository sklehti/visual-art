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
import imageUpload2Reducer from "./reducers/imageUpload2Reducer";
import imageUpdateReducer from "./reducers/imageUpdateReducer";
import imageUpdate2Reducer from "./reducers/imageUpdate2Reducer";

const store = configureStore({
  reducer: {
    showroom: showroomReducer,
    admin: adminReducer,
    loggingValidated: loggingValidateReducer,
    imageUpload: imageUploadReducer,
    imageUpload2: imageUpload2Reducer,
    pageView: pageViewReducer,
    imageUpdate: imageUpdateReducer,
    imageUpdate2: imageUpdate2Reducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
