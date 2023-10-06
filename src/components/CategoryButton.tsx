import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import '../styles/categoorybutton.css';
import All from '../images/All.png';
import Beef from '../images/beef.png';
import Goat from '../images/goat.png';
import Chicken from '../images/chicken.png';
import Breakfast from '../images/breakfast.png';
import Dessert from '../images/dessert.png';
import AllDrinks from '../images/AllDrinks.png';
import Ordinary from '../images/drink.png';
import Cocktail from '../images/cocktail.png';
import Shake from '../images/shake.png';
import Other from '../images/other.png';
import Cocoa from '../images/cocoa.png';

type CategoryMealType = {
  strCategory: string;
};

type CategoryDrinkType = {
  strCategory: string;
};

type IconsMealsType = {
  Beef: string;
  Breakfast: string;
  Chicken: string;
  Dessert: string;
  Goat: string;
};

type IconsDrinksType = {
  Ordinary: string;
  Cocktail: string;
  Shake: string;
  Other: string;
  Cocoa: string;
};

const iconsMeals: IconsMealsType = {
  Beef,
  Breakfast,
  Chicken,
  Dessert,
  Goat,
};

const iconsDrinks: IconsDrinksType = {
  'Ordinary Drink': Ordinary,
  Cocktail,
  Shake,
  'Other / Unknown': Other,
  Cocoa,
};

function CategoryButton() {
  const [categoryMeal, setCategoryMeal] = useState<CategoryMealType[]>([]);
  const [categoryDrink, setCategoryDrink] = useState<CategoryDrinkType[]>([]);
  const [toggleMeal, setToggleMeal] = useState<boolean>(false);
  const [toggleDrink, setToggleDrink] = useState<boolean>(false);

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const filterByCategoryMeal = async (category: string, toggle: boolean) => {
    setToggleMeal(toggle);

    if (toggle === true) {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(URL);
      const data = await response.json();

      dispatch({
        type: 'SET_MEALS',
        payload: data.meals,
      });
    }
    if (toggle === false) {
      mealsAPI();
    }
  };

  const filterByCategoryDrink = async (category: string, toggle: boolean) => {
    setToggleDrink(toggle);

    if (toggle === true) {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(URL);
      const data = await response.json();

      dispatch({
        type: 'SET_DRINKS',
        payload: data.drinks,
      });
    }
    if (toggle === false) {
      drinksAPI();
    }
  };

  const mealsCategoryButtons = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(URL);
    const data = await response.json();

    setCategoryMeal(data.meals);
  };

  const drinksCategoryButtons = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(URL);
    const data = await response.json();

    setCategoryDrink(data.drinks);
  };

  const mealsAPI = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();

    dispatch({
      type: 'SET_MEALS',
      payload: data.meals,
    });
  };

  const drinksAPI = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();

    dispatch({
      type: 'SET_DRINKS',
      payload: data.drinks,
    });
  };

  useEffect(() => {
    mealsCategoryButtons();
    drinksCategoryButtons();
  }, []);

  return (
    <div className="div-category">
      {pathname === '/meals' ? (
        <button
          data-testid="All-category-filter"
          onClick={ () => mealsAPI() }
          className="animate__animated animate__fadeInDown"
        >
          <img src={ All } className="img-category-class" alt={ All } />
        </button>
      ) : null}
      {pathname === '/drinks' ? (
        <button
          data-testid="All-category-filter"
          onClick={ () => drinksAPI() }
          className="animate__animated animate__fadeInDown"
        >
          <img src={ AllDrinks } className="img-category-class" alt={ AllDrinks } />
        </button>
      ) : null}
      {pathname === '/meals' && categoryMeal?.slice(0, 5)
        .map((category: CategoryMealType, index: number) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => filterByCategoryMeal(category.strCategory, !toggleMeal) }
            className="animate__animated animate__fadeInDown"
          >
            <img
              alt={ category.strCategory }
              className="img-category-class"
              src={ iconsMeals[category.strCategory] }
            />
          </button>
        ))}

      {pathname === '/drinks' && categoryDrink?.slice(0, 5)
        .map((category: CategoryDrinkType, index: number) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => filterByCategoryDrink(category.strCategory, !toggleDrink) }
            className="animate__animated animate__fadeInDown"
          >
            <img
              alt={ category.strCategory }
              className="img-category-class"
              src={ iconsDrinks[category.strCategory] }
            />
          </button>
        ))}
    </div>
  );
}

export default CategoryButton;
