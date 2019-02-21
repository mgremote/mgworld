import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';

const container = document.getElementById('container');
ReactDOM.render(<App store={store} />, container);
