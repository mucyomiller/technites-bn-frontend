import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../styles/App.css'
import Router from './Router'

const App = () => {
  return (
    // Whole app wrapped in BrowserRouter to provide the browser’s HTML5 History APIs
    <BrowserRouter>
    <div className="App">
      <Router />
    </div>
    </BrowserRouter>
  );
}

export default App;
