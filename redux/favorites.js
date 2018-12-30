import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVORITE:
            // if this dishes in already favorites
            if(state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload) // payload contains dishId
        default:
            return state;
    }
}