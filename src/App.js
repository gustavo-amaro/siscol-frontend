import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import Router from "./routes";
import GlobalStyle from './styles/global';

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <Router />
      <GlobalStyle />
    </Provider>
  );
}

export default App;
