import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type ReduxState = {
  meals: {
    meals: Meals;
  }
};

export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type Meals = Meal[];

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
