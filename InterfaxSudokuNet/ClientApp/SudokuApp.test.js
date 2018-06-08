import React from 'react';
import ReactDOM from 'react-dom';
import SudokuApp from './SudokuApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SudokuApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
