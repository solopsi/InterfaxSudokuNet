import * as types from '../constants/ActionTypes';

export function newGame(name) {
    return {
        type: types.NEW_GAME
    };
}

export function verifyGame() {
    return {
        type: types.VERIFY_GAME        
    };
}

export function activeCell(id) {
    return {
        type: types.ACTIVE_CELL,
        id
    };
}
export function openCell(id) {
    return {
        type: types.OPEN_CELL,
        id
    };
}