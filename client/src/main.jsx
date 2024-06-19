import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer.js";
import userReducer from "./reducers/userReducer.js";
import notificationReducer from "./reducers/notificationReducer.js";
import searchReducer from "./reducers/searchReducer.js";
import { BrowserRouter as Router } from "react-router-dom";
import { createContext } from "react";

export const localStorageContext = createContext("");

const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
    notify: notificationReducer,
    search: searchReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
);
