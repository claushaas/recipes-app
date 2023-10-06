import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { Drink, Meal, ReduxState } from '../types';
import '../styles/meals.css';
import CategoryButton from '../components/CategoryButton';
import Loading from '../components/Loading';

function Recipes() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [showCategory, setShowCategory] = useState(false);

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

  setTimeout(() => {
    setShowCategory(true);
  }, 3000);

  return (
    <>
      <Header
        title={ title }
        showSearch
        showProfile
      />
      {showCategory
        ? <div className="container-div-recipes">
          <CategoryButton />
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
        </div>
        : <Loading /> }
      <Footer />
    </>
  );
}

export default Recipes;
