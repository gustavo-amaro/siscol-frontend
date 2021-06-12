import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import Router from "./routes";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
const store = createStore(reducers);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router />
        <GlobalStyle />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
