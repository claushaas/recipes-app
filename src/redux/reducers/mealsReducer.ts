import { AnyAction } from 'redux';
import { SET_MEALS } from '../actions';

const INITIAL_STATE = {
  meals: [
    // {
    //   strMeal: 'Corba',
    //   strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    //   idMeal: '52977',
    // },
  ],
};

const mealsReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_MEALS:
      return {
        ...state,
        meals: action.payload,
      };
    default:
      return state;
  }
};

export default mealsReducer;
