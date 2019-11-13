/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/App';


describe('root App component', () => {
  it('should mount App Component w/o crash', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
