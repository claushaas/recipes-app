import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { fetchDrinks, fetchMeals } from '../redux/actions';
import { ReduxState } from '../types';
import '../styles/searchBar.css';

type FormValuesTypes = {
  term: string;
  searchType: string;
};

const initialFormValues = {
  term: '',
  searchType: '',
};

function SearchBar() {
  const [formValues, setFormValues] = useState<FormValuesTypes>(initialFormValues);
  const [searched, setSearched] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const meals = useSelector((state: ReduxState) => state.meals);
  const drinks = useSelector((state: ReduxState) => state.drinks);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location.pathname === '/meals') {
      dispatch(
        fetchMeals(formValues.term, formValues.searchType) as unknown as AnyAction,
      );
    }

    if (location.pathname === '/drinks') {
      dispatch(
        fetchDrinks(formValues.term, formValues.searchType) as unknown as AnyAction,
      );
    }

    setSearched(true);
  };

  useEffect(() => {
    if (formValues.searchType === 'firstLetter' && formValues.term.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      setFormValues({
        ...formValues,
        term: '',
      });
    }
  }, [formValues]);

  useEffect(() => {
    if (meals.meals?.length === 1) {
      navigate(`/meals/${meals.meals[0].idMeal}`);
    }

    if (!meals.meals && searched) {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
      setSearched(false);
    }

    if (drinks.drinks?.length === 1) {
      navigate(`/drinks/${drinks.drinks[0].idDrink}`);
    }

    if (!drinks.drinks && searched) {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
      setSearched(false);
    }
  }, [meals, drinks, navigate, searched]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={ handleFormSubmit }
      className="searchBarForm"
    >
      <input
        type="text"
        name="term"
        className="term"
        data-testid="search-input"
        onChange={ handleChange }
        value={ formValues.term }
        placeholder="Search"
      />
      <div className="div-input">
        <label htmlFor="ingredient" className="input-ingredient">
          <input
            data-testid="ingredient-search-radio"
            className="ingredient"
            value="ingredient"
            type="radio"
            name="searchType"
            required
            checked={ formValues.searchType === 'ingredient' }
            onChange={ handleChange }
          />
          Ingredient
        </label>
        <label htmlFor="name" className="input-name">
          <input
            data-testid="name-search-radio"
            className="name"
            value="name"
            type="radio"
            name="searchType"
            required
            checked={ formValues.searchType === 'name' }
            onChange={ handleChange }
          />
          Name
        </label>
        <label htmlFor="firstLetter" className="input-letter">
          <input
            data-testid="first-letter-search-radio"
            className="firstLetter"
            value="firstLetter"
            type="radio"
            name="searchType"
            required
            checked={ formValues.searchType === 'firstLetter' }
            onChange={ handleChange }
          />
          First Letter
        </label>
      </div>
      <button type="submit" data-testid="exec-search-btn" className="button-seacrh">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
