import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDrinks, fetchMeals } from '../redux/actions';
import { ReduxState } from '../types';

function SearchBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { meals, drinks } = useSelector((state: ReduxState) => state);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { term, searchType } = e.currentTarget;

    if (searchType.value === 'firstLetter' && term.value.length > 1) {
      return window.alert('Your search must have only 1 (one) character');
    }
    if (location.pathname === '/meals') {
      dispatch(fetchMeals(term.value, searchType.value));
    }

    if (location.pathname === '/drinks') {
      dispatch(fetchDrinks(term.value, searchType.value));
    }
  };

  useEffect(() => {
    console.log(meals.meals.length);
    if (meals.meals.length === 1) {
      navigate(`/meals/${meals.meals[0].idMeal}`);
    }

    if (drinks.drinks.length === 1) {
      navigate(`/drinks/${drinks.drinks[0].idDrink}`);
    }
  }, [meals, drinks, navigate]);

  return (
    <form onSubmit={ handleFormSubmit }>
      <input type="text" name="term" id="term" data-testid="search-input" />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          id="ingredient"
          value="ingredient"
          type="radio"
          name="searchType"
          required
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          id="name"
          value="name"
          type="radio"
          name="searchType"
        />
        Name
      </label>
      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          id="firstLetter"
          value="firstLetter"
          type="radio"
          name="searchType"
        />
        First Letter
      </label>
      <button type="submit" data-testid="exec-search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
