import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type ReduxState = {
  meals: {
    meals: Meal[];
  };
  drinks: {
    drinks: Drink[];
  };
};

export type Drink = {
  strDrink: string;
  strAlcoholic: string;

};

export type Drinks = Drink[];

export type Meal = {
  strMeal: string;
  strCategory: string;

};

export type Meals = Meal[];

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;