import React from 'react';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reducers from './reducers';
import Sidebar from './template/sidebar';
import TopBar from './template/topbar';
import Footer from './template/footer';
import Routes from './routes';
import './styles.scss';

const store = createStore(reducers);

function App() {
  
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Sidebar />
          <div className="content">
              <TopBar />
              <div className="main-content">
                  <Routes />
              </div>
              <Footer />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
