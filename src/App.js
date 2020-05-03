import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import Sidebar from "./template/sidebar";
import TopBar from "./template/topbar";
import Footer from "./template/footer";
import Router from "./routes";
import { useLocation } from "react-router-dom";
import "./styles.scss";

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
  ]
  return (
    <Provider store={store}>
      {!specialPaths.includes(location.pathname) ? (
        <div className="App">
          <Sidebar />
          <div className="content">
            <TopBar />
            <div className="main-content">
              <Router />
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <Router />
      )}
    </Provider>
  );
}

export default App;
