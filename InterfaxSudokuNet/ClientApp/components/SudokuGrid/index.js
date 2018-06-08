import React, { Component } from 'react';
import SudokuCell from '../SudokuCell';
import SudokuButtons from '../SudokuButtons';

export default class SudokuGrid extends Component {
	handleCellValueChange = (i, j, newValue) => {
		this.props.onCellValueChange(i, j, newValue);
	}
	handleFocusCell = (i,j) => {
		this.props.onFocusCell(i,j);
	}

	generateGrid = () => {
		const board = [];
		const boardState = this.props.boardState;
		

		for(let i=0; i<boardState.length; i++) {
			let currRow = [];
			for(let j=0; j<boardState[i].length; j++) {
				const conflicts = this.props.conflicts;
				const conflict = conflicts.has(i+""+j) ? true: false;
				let currCell = (
									<SudokuCell
										key           = {"" + i + j}
										value         = {/*(boardState[i][j].visible)? "" : */boardState[i][j].value}
										resultvalue		= {boardState[i][j].resultvalue}
										editable      = {boardState[i][j].editable}
										conflict  		= {conflict}
										rowIndex      = {i}
										colIndex      = {j}
										onValueChange = {this.handleCellValueChange}
										onFocusCell 	= {this.handleFocusCell}
								    />
								 )
				currRow.push(currCell);
			}
			board.push(<tr key = {i}>{currRow}</tr>);
		}
		return board;
	}

	render() {
		const board = this.generateGrid();
		return (
			  <div>
				<table className = "SudokuGrid">
				  <tbody>
					{board}
				  </tbody>
				</table>
				<h2>{this.props.verifyMessage}</h2>
				<SudokuButtons					
					onNewGameClick = {this.props.onNewGameClick}
					onVerifyClick  = {this.props.onVerifyClick}
				  onOpenClick    = {this.props.onOpenClick}				  
				/>
			  </div>
		);
	}
}
