import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { Drink, Meal, ReduxState } from '../types';
import '../styles/meals.css';
import food from '../images/foods.png';
import drinkImg from '../images/drinks.png';

function Recipes() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const meals = useSelector((state: ReduxState) => state.meals);
  const drinks = useSelector((state: ReduxState) => state.drinks);

  const title = pathname === '/meals' ? 'Meals' : 'Drinks';

  useEffect(() => {
    const mealsAPI = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL);
      const data = await response.json();

      dispatch({
        type: 'SET_MEALS',
        payload: data.meals,
      });
    };

    mealsAPI();

    const drinksAPI = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
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
      {pathname === '/meals'
        ? (
          <div className="div-img">
            <img src={ food } alt="food" className="img-food" />
          </div>
        )
        : (
          <div className="div-img">
            <img src={ drinkImg } id="img-food" alt="drink" />
          </div>
        )}
      <section className="cardsContainer">
        {pathname === '/meals' && meals.meals?.slice(0, 12)
          .map((meal: Meal, index: number) => (
            <RecipeCard
              key={ index }
              index={ index }
              img={ meal.strMealThumb }
              name={ meal.strMeal }
              id={ meal.idMeal }
            />
          ))}
        {pathname === '/drinks' && drinks.drinks?.slice(0, 12)
          .map((drink: Drink, index: number) => (
            <RecipeCard
              key={ index }
              index={ index }
              img={ drink.strDrinkThumb }
              name={ drink.strDrink }
              id={ drink.idDrink }
            />
          ))}
      </section>
      <Footer />
    </>
  );
}

export default Recipes;
