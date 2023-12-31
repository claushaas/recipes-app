import { searchDrinksAPI, searchMealsAPI } from '../../services/searchAPI';
import { Dispatch, Drinks, Meals } from '../../types';

export const SET_MEALS = 'SET_MEALS';
export const SET_DRINKS = 'SET_DRINKS';
export const SET_RECIPE_DETAILS = 'SET_RECIPE_DETAILS';
export const SET_DRINKS_RECOMENDTARIONS = 'SET_MEAL_RECOMMENDATIONS';
export const SET_MEALS_RECOMENDTARIONS = 'SET_DRINK_RECOMMENDATIONS';

const setRecipeDetails = (data: any) => ({
  type: SET_RECIPE_DETAILS,
  payload: data,
});

const getMeals = (data: Meals) => ({
  type: SET_MEALS,
  payload: data,
});

export const fetchMeals = (term: string, searchType: string) => async (
  dispatch: Dispatch,
) => {
  try {
    const data = await searchMealsAPI(term, searchType);
    dispatch(getMeals(data));
  } catch (error) {
    console.log(error);
  }
};

const getDrinks = (data: Drinks) => ({
  type: SET_DRINKS,
  payload: data,
});

const getDrinksRecommendations = (data: Drinks) => ({
  type: SET_DRINKS_RECOMENDTARIONS,
  payload: data,
});

const getMealsRecommendations = (data: Meals) => ({
  type: SET_MEALS_RECOMENDTARIONS,
  payload: data,
});

export const fetchDrinks = (term: string, searchType: string) => async (
  dispatch: Dispatch,
) => {
  try {
    const data = await searchDrinksAPI(term, searchType);
    dispatch(getDrinks(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecipeDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    const isMeal = window.location.pathname.startsWith('/meals');
    const apiUrl = isMeal
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    dispatch(setRecipeDetails(data));

    if (isMeal) {
      const drinksRecommendationsData = await searchDrinksAPI('', 'name');
      dispatch(getDrinksRecommendations(drinksRecommendationsData));
    } else {
      const mealsRecommendationsData = await searchMealsAPI('', 'name');
      dispatch(getMealsRecommendations(mealsRecommendationsData));
    }
  } catch (error) {
    console.error(error);
  }
};
