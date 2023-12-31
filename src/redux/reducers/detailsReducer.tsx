import { AnyAction } from 'redux';
import { SET_RECIPE_DETAILS } from '../actions';
import { RecipeDetailsType } from '../../types';

interface DetailsState {
  details: RecipeDetailsType | null; // Use the union type here
}

const INITIAL_STATE: DetailsState = {
  details: null,
};

const detailsReducer = (state = INITIAL_STATE, action: AnyAction): DetailsState => {
  switch (action.type) {
    case SET_RECIPE_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
};

export default detailsReducer;
