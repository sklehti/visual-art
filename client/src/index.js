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
import allImages1Reducer from "./reducers/allImages1Reducer";
import allImages2Reducer from "./reducers/allImages2Reducer";
import allImages3Reducer from "./reducers/allImages3Reducer";
import allImages4Reducer from "./reducers/allImages4Reducer";
import allImages5Reducer from "./reducers/allImages5Reducer";
import allImages6Reducer from "./reducers/allImages6Reducer";

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
    allImages1: allImages1Reducer,
    allImages2: allImages2Reducer,
    allImages3: allImages3Reducer,
    allImages4: allImages4Reducer,
    allImages5: allImages5Reducer,
    allImages6: allImages6Reducer,
  },
});

ReactDOM.createRoot(
  document.getElementById("root") || document.createElement("div")
).render(
  <Provider store={store}>
    <App />
  </Provider>
);
