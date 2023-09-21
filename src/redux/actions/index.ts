import { searchDrinksAPI, searchMealsAPI } from '../../services/searchAPI';
import { Dispatch, Meals } from '../../types';

export const SET_MEALS = 'SET_MEALS';
export const SET_DRINKS = 'SET_DRINKS';

const getMeals = (data: Meals) => ({
  type: SET_MEALS,
  payload: data,
});

export const fetchMeals = (term: string, searchType: string) => async (
  dispatch: Dispatch,
) => {
  const data = await searchMealsAPI(term, searchType);
  dispatch(getMeals(data));
};

const getDrinks = (data) => ({
  type: SET_DRINKS,
  payload: data,
});

export const fetchDrinks = (term: string, searchType: string) => async (
  dispatch: Dispatch,
) => {
  const data = await searchDrinksAPI(term, searchType);
  dispatch(getDrinks(data));
};
