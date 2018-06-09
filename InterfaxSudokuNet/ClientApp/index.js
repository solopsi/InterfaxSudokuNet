import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import SudokuApp from './components/SudokuApp';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from "redux";
import { combineReducers } from 'redux';
import { Provider } from "react-redux";

import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><SudokuApp /></Provider>, document.getElementById('root'));
registerServiceWorker();
