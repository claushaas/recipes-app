export const searchMealsAPI = async (term: string, searchType: string) => {
  switch (searchType) {
    case 'ingredient':
      return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
        .then((response) => response.json())
        .then((data) => data.meals);
    case 'name':
      return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then((response) => response.json())
        .then((data) => data.meals);
    case 'firstLetter':
      return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
        .then((response) => response.json())
        .then((data) => data.meals);
    default:
      return [];
  }
};

export const searchDrinksAPI = async (term: string, searchType: string) => {
  switch (searchType) {
    case 'ingredient':
      return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${term}`)
        .then((response) => response.json())
        .then((data) => data.drinks);
    case 'name':
      return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
        .then((response) => response.json())
        .then((data) => data.drinks);
    case 'firstLetter':
      return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${term}`)
        .then((response) => response.json())
        .then((data) => data.drinks);
    default:
      return [];
  }
};
