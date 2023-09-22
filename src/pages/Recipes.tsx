import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { Drink, Meal, ReduxState } from '../types';

function Recipes() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { meals, drinks } = useSelector((state: ReduxState) => state);

  const title = pathname === '/meals' ? 'Meals' : 'Drinks';

  useEffect(() => {
    const mealsAPI = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
      const response = await fetch(URL);
      const data = await response.json();

      dispatch({
        type: 'SET_MEALS',
        payload: data.meals,
      });
    };

    mealsAPI();

    const drinksAPI = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s';
      const response = await fetch(URL);
      const data = await response.json();

      dispatch({
        type: 'SET_DRINKS',
        payload: data.drinks,
      });
    };

    drinksAPI();
  }, [dispatch]);

  return (
    <>
      <Header
        title={ title }
        showSearch
        showProfile
      />
      {pathname === '/meals' && meals.meals?.slice(0, 12)
        .map((meal: Meal, index: number) => (
          <RecipeCard
            key={ index }
            index={ index }
            img={ meal.strMealThumb }
            name={ meal.strMeal }
          />
        ))}
      {pathname === '/drinks' && drinks.drinks?.slice(0, 12)
        .map((drink: Drink, index: number) => (
          <RecipeCard
            key={ index }
            index={ index }
            img={ drink.strDrinkThumb }
            name={ drink.strDrink }
          />
        ))}

    </>
  );
}

export default Recipes;
