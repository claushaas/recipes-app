import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

type RecipeCommon = {
  id: string;
  name: string;
  thumbnail: string;

};

export type ReduxState = {
  meals: {
    meals: Meal[];
  };
  drinks: {
    drinks: Drink[];
  };
};

export type Drink = RecipeCommon & {
  strDrink: string;
  strAlcoholic: string;

};

export type Drinks = Drink[];

export type Meal = RecipeCommon & {
  strMeal: string;
  strCategory: string;

};

export type Meals = Meal[];

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;