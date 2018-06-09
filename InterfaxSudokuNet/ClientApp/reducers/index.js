import * as actionTypes from '../constants/ActionTypes';

export function reducer(state = {}, action) {
    switch (action.type) {
        case actionTypes.NEW_GAME:
            console.log(actionTypes.NEW_GAME);
        case actionTypes.VERIFY_GAME:
            console.log(actionTypes.VERIFY_GAME);
        case actionTypes.ACTIVE_CELL:
            console.log(actionTypes.ACTIVE_CELL);
        case actionTypes.OPEN_CELL:
            console.log(actionTypes.OPEN_CELL);
        default:
            return state;
    }
}