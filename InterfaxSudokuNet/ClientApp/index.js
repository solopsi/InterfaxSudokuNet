import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import SudokuApp from './components/SudokuApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SudokuApp />, document.getElementById('root'));
registerServiceWorker();
