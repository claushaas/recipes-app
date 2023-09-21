import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';
import drinksReducer from './drinksReducer';

const rootReducer = combineReducers({
  meals: mealsReducer,
  drinks: drinksReducer,
});

export default rootReducer;
