import React, { Component } from 'react';
import "./index.css";

export default class SudokuCell extends Component {

	generateCellContent = () => {		
		const disabled = !this.props.editable;		
		const cellValue = this.props.value;
		const cellResultValue = this.props.resultValue;

		// ручные настройки представления borders как в судоку
		const style = {};
		const classNames = ["sudoku-cell"];
		const ri = this.props.rowIndex;
		const ci = this.props.colIndex;
		if(ri > 0 && ri % 3 === 0) {			
			classNames.push("sudoku-cell-border-top");
		}
		if(ci > 0 && ci % 3 === 0) {			
			classNames.push("sudoku-cell-border-border-left");
		}		
		if((Math.floor(ri/3)%2) > 0){
			if((Math.floor(ci/3)%2) > 0){
				classNames.push("bright");
			}else{
				classNames.push("light");
			}
		}else{			
			if((Math.floor(ci/3)%2) > 0){
				classNames.push("light");
			}else{
				classNames.push("bright");
			}
		}
		if(this.props.conflict) {
			if(this.props.editable) {				
				classNames.push("conflict");
			} else {				
				classNames.push("conflict_with");
			}
		}

		return (
			<td>
			  <input
				className       = {classNames.join(" ")}
			    style           = {style}
			  	type 			= "text"
				value 			= {cellValue}
				resultvalue 	= {cellResultValue}
			  	disabled 		= {disabled}
			  	onChange 		= {this.handleCellValueChange}
				onFocus			= {this.handleFocusCell}/>
			</td>
			);
	}

	handleCellValueChange = (e) => {
		const newCellValue = e.target.value;
		if(this.isValidInput(newCellValue)) {
			const ri = this.props.rowIndex;
			const ci = this.props.colIndex;
			this.props.onValueChange(ri, ci, newCellValue);			
		}
	}

	handleFocusCell = (e) =>{
		console.log("handleFocusCell e=",e);
		const ri = this.props.rowIndex;
		const ci = this.props.colIndex;
		this.props.onFocusCell(ri,ci);
	}

	/**Валидатор значений поля/ячейки*/
	isValidInput = (i) => {
		return (i === '' || (i.length === 1 && isNumeric(i)));
	}

	render() {
		return this.generateCellContent();
	}
}

const isNumeric = (num) => {
	return !isNaN(num);
}
