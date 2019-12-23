import React from 'react';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import reducers from './reducers';
import Sidebar from './template/sidebar';
import TopBar from './template/topbar';
import Footer from './template/footer';
import './styles.scss';

const store = createStore(reducers);

function App() {
  
  return (
    <Provider store={store}>
      <div className="App">
        <Sidebar />
        <div className="content">
            <TopBar />
            <div className="main-content">
              <h3>Dashboard</h3>
            </div>
            <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
