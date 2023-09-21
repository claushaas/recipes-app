export const searchMealsAPI = async (term: string, searchType: string) => {
  let response;
  if (searchType === 'ingredient') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
  }
  if (searchType === 'name') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  }
  if (searchType === 'firstLetter') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
  }
  const data = await response?.json();
  return data && data.meals;
};

export const searchDrinksAPI = async (term: string, searchType: string) => {
  let response;
  if (searchType === 'ingredient') {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${term}`);
  }
  if (searchType === 'name') {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`);
  }
  if (searchType === 'firstLetter') {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${term}`);
  }
  const data = await response?.json();
  return data.drinks;
};
