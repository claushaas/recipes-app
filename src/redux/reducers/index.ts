import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';
import drinksReducer from './drinksReducer';
import RecipeDetails from '../../components/RecipeDetails';

const rootReducer = combineReducers({
  meals: mealsReducer,
  drinks: drinksReducer,
  recipeDetails: RecipeDetails,
});

export default rootReducer;
