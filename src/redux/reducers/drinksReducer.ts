import { AnyAction } from 'redux';
import { SET_DRINKS } from '../actions';

const INITIAL_STATE = {
  drinks: [],
};

const drinksReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_DRINKS:
      return {
        ...state,
        drinks: action.payload,
      };
    default:
      return state;
  }
};

export default drinksReducer;
