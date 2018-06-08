import React, { Component } from 'react';
//import Button from 'material-ui/Button';
import { Button } from 'react-bootstrap';
import "./index.css";

export default class SudokuButtons extends Component {
	render() {
    	//const btnStyle = {marginTop: 25, marginLeft: 18, marginRight: 10};
		return (
			<div className = "sudoku-buttons">
				<Button
					className = "sudoku-control-btn"							
					onClick   = {this.props.onNewGameClick}>
					Новая игра
				</Button>
				<Button
					className = "sudoku-control-btn"		
					onClick   = {this.props.onVerifyClick}>
					Проверить
				</Button>
				<Button
					className = "sudoku-control-btn"					
					onClick   = {this.props.onOpenClick}>
					Открыть ячейку
				</Button>		      
		    </div>
			);
	}
}
