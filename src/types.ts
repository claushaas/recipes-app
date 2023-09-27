import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type ReduxState = {
  meals: {
    meals: Meal[];
  };
  drinks: {
    drinks: Drink[];
  };
  recipeDetails: {
    details: RecipeDetailsType;
  };
};

export type Drink = {
  idDrink: any;
  strDrinkThumb: string;
  strDrink: string;
  strAlcoholic: string;

};

export type Drinks = Drink[];

export type Meal = {
  idMeal: any;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;

};

export type Meals = Meal[];

export type MealDetails = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  ingredients: { ingredient: string; measure: string }[];
};

export type DrinkDetails = {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strInstructions: string;
  strDrinkThumb: string;
  strTags?: string;
  strYoutube?: string;
  ingredients: { ingredient: string; measure: string }[];
};

export type RecipeDetailsType = MealDetails | DrinkDetails;

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
