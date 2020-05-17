import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import Router from "./routes";
import "./styles.scss";
import { useLocation } from "react-router-dom";
import Template from './template';

const store = createStore(reducers);

function App() {
  const location = useLocation();
  const specialPaths = [
    '/login', 
    '/register', 
    '/register/responsavel',
    '/login/',
    '/register/',
    '/register/responsavel/',
    '/register/entidade',
    '/register/entidade/'
  ];
  return (
    <Provider store={store}>
      {!specialPaths.includes(location.pathname) ? (
        <Template component={<Router/>} />
      ):(<Router />)}

    </Provider>
  );
}

export default App;
