import React, { Component } from 'react';
import Grid from '../SudokuGrid';
import model from '../SudokuModel';
import logo from './logo.svg';
import './index.css';
import { newGame, verifyGame, activeCell, openCell } from '../../actions/SudokuActions';

class SudokuApp extends Component {

  constructor(props) {
    super(props);    
    this.getRandomModelItem = this.randomNoRepeats(model);
    let formattedGame = this.getFormattedGame();

    this.state = {            
            boardState : formattedGame.game,
            focusedCell: null,
            modelItemId: formattedGame.id,
            conflicts : new Set([]),
            verifyMessage: "",
            openedGames: [formattedGame.id]
          };
  }

  getFormattedGame = () => {
    const game = this.getRandomModelItem();    
    const formattedGame = this.formatGame(game);    
    return {id: game.id, game: formattedGame};
  }

  randomNoRepeats = (array) => {
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }

  getDeepCopyOfArray = (arr) => {
    return JSON.parse(JSON.stringify(arr));
  }

  handleCellValueChange = (i, j, newValue) => {
    this.setState(prevState => {
      const newBoardState = this.getDeepCopyOfArray(prevState.boardState);
      const prevEditable = prevState.boardState[i][j].editable;
      const resultvalue = prevState.boardState[i][j].resultvalue;
      newBoardState[i][j] = {
        value       : newValue,
        resultvalue : resultvalue,
        cellId      : this.stringify(i, j),
        editable    : prevEditable
      };     

      return {boardState: newBoardState, conflicts : new Set([])};

    });
  }

    handleFocusCell = (i, j) => {                
        this.setState(prevState =>{
            return {focusedCell: this.stringify(i, j)}
    });
  }

  handleOpenClick = () => {
    console.log("Open Cell. cell=", this.state.focusedCell);
    if(this.state.focusedCell && this.state.focusedCell.length>0){
      var indexes = this.state.focusedCell.split("");
      var i = indexes[0], j = indexes[1];
      this.setState(prevState => {
        const newBoardState = this.getDeepCopyOfArray(prevState.boardState);
        const prevEditable = prevState.boardState[i][j].editable;
        newBoardState[i][j] = {
          value       : prevState.boardState[i][j].resultvalue,
          resultvalue : prevState.boardState[i][j].resultvalue,
          cellId      : this.stringify(i, j),
          editable    : prevEditable
        };     

        return {boardState: newBoardState, conflicts : new Set([])};
      })
    }else{
      alert("Выберите ячейку.");
    }
  }

  handleNewGameClick = () => {
    let formattedGame = this.getFormattedGame();
    this.setState({      
      boardState: formattedGame.game,
      modelItemId: formattedGame.id,
      conflicts : new Set([]),
      verifyMessage: ""
    });
  }

  handleVerifyClick = () => {    
    const cells = this.state.boardState;
    const conflicts = this.getCellConflicts(cells);
    let verifyMesssage = "В решении нет ошибок";
    if(conflicts.length>0){
      verifyMesssage = "В решении есть ошибки";
    }else if(this.getEmptyCellsCount(cells) === 0){
      verifyMesssage = "Поздравляю Вас! Вы правильно решили Судоку";
    }
    this.setState({conflicts: new Set(conflicts), verifyMessage: verifyMesssage});
  }

  getCellConflicts = (boardState) => {
    let conflictCells = [];
    for(let i=0; i< boardState.length; i++){
      for(let j=0; j<boardState[i].length; j++){
        let cell = boardState[i][j];
        if(isNumeric(cell.value) && (cell.value !== cell.resultvalue)){
          conflictCells.push(cell.cellId);
        }
      }
    }    
    return conflictCells;
  }

  getEmptyCellsCount = (boardState) => {
    let counter = 0;
    for(let i=0; i< boardState.length; i++){
      for(let j=0; j<boardState[i].length; j++){
        let cell = boardState[i][j];
        if(!isNumeric(cell.value)){
          counter++;
        }
      }
    }    
    return counter;
  }
  /*
  flatten = (a) => {
    return Array.isArray(a) ? [].concat(...a.map(this.flatten)) : a;
  }
*/
/*
  getConflicts = (arrs) => {
    return (arrs
            .map(arr => this.getConflictsInArray(arr)));
  }

  getConflictsInArray = (arr) => {
    const conflictMap = {};
    for(let i=0; i<arr.length; i++) {
      let curr = arr[i];
      if(curr.value !== "0") {
        if(conflictMap.hasOwnProperty(curr.value)) {
          conflictMap[curr.value].push(curr.cellId);
        } else {
          conflictMap[curr.value] = [curr.cellId];
        }        
      }
    }
    return Object.values(conflictMap).filter(arr => arr.length>1); 
  }
  */
  /*
  formatPuzzle = (puzzle) => {
    const formattedPuzzle = createArray(9, 9);
    for(let i=0; i<puzzle.length; i++) {
      const rowId = this.getRowId(i);
      const colId = this.getColId(i);

      const editable = puzzle[i] === '0' ? true : false;

      formattedPuzzle[rowId][colId] = {
        value : puzzle[i],
        cellId    : this.stringify(rowId, colId),
        editable  : editable
      };
    }
    return formattedPuzzle;
  }
  */
  formatGame = (game) => {
    var formattedGame = createArray(9,9);        
    for(var i=0; i<game.cells.length; i++) {      
      var rowId = i;
      for(var j=0;j<game.cells[rowId].length; j++){
        var colId = j;        
        formattedGame[rowId][colId] = {
          value       : (game.cells[rowId][colId].editable)? "" : game.cells[rowId][colId].value,
          resultvalue : game.cells[rowId][colId].value,
          cellId      : this.stringify(rowId, colId),
          editable    : game.cells[rowId][colId].editable
        };                
      }
    }
    
    return formattedGame;
  }

  stringify = (num1, num2) => {
    return num1 + '' + num2;
  }

  getRowId = (i) => {
    return Math.floor(i/9);
  }

  getColId = (i) => {
    return (i%9);
  }  

  render() {
    return (
      <div className="SudokuApp">
        <header className="SudokuApp-header">
          <img src={logo} className="SudokuApp-logo" alt="logo" />
          <h1 className="SudokuApp-title">Interfax Task - SUDOKU # {this.state.modelItemId}</h1>          
        </header>
        <div className="SudokuApp-intro">
          <Grid
            boardState          = {this.state.boardState} 
            conflicts           = {this.state.conflicts}
            verifyMessage       = {this.state.verifyMessage}
            onNewGameClick      = {this.handleNewGameClick}
            onCellValueChange   = {this.handleCellValueChange}
            onFocusCell         = {this.handleFocusCell}            
            onOpenClick         = {this.handleOpenClick}
            onVerifyClick       = {this.handleVerifyClick}
          />
        </div>
      </div>
    );
  }
}

function createArray(length) {
  var arr = new Array(length || 0),
      i = length;

  if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

window.getModelItem = function(inputString, resultString){
  var resultArray = createArray(9,9);
  var inputStringArray = inputString.split("");
  var resultStringArray = resultString.split("");
  if(inputStringArray.length !== resultStringArray.length){
    console.error("Не верные массивы на входе.")
  }else{
    var length = inputStringArray.length;
    for(var i=0;i<length; i++){
        let editable = (inputStringArray[i] > 0 )? false : true;
        let value =  resultStringArray[i];
        let row = Math.floor(i/9);
        let col = i%9;
        resultArray[row][col] = {value: value, editable:editable};
    }
  }
  console.log(resultArray);
  return JSON.stringify(resultArray);
}

const isNumeric = (num) => {
	return ((typeof num) === "string" && num.length>0)&&!isNaN(num);
}


export default SudokuApp;
