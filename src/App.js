import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import Router from "./routes";
import "./styles.scss";

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
