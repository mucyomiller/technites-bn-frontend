import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import configureStore from '../redux/store/configureStore';
import '../styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import Router from './Router';

const store = configureStore();
const App = () => (
  // Whole app wrapped in BrowserRouter to provide the browser’s HTML5 History APIs
  <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
