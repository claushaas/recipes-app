import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

type CategoryMealType = {
  strCategory: string;
};

type CategoryDrinkType = {
  strCategory: string;
};

function CategoryButton() {
  const [categoryMeal, setCategoryMeal] = useState<CategoryMealType[]>([]);
  const [categoryDrink, setCategoryDrink] = useState<CategoryDrinkType[]>([]);

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const filterByCategoryMeal = async (category: string) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(URL);
    const data = await response.json();

    dispatch({
      type: 'SET_MEALS',
      payload: data.meals,
    });
  };

  const filterByCategoryDrink = async (category: string) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(URL);
    const data = await response.json();

    dispatch({
      type: 'SET_DRINKS',
      payload: data.drinks,
    });
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
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ pathname === '/meals' ? () => mealsAPI() : () => drinksAPI() }
      >
        All
      </button>

      {pathname === '/meals' && categoryMeal?.slice(0, 5)
        .map((category: CategoryMealType, index: number) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => filterByCategoryMeal(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}

      {pathname === '/drinks' && categoryDrink?.slice(0, 5)
        .map((category: CategoryDrinkType, index: number) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => filterByCategoryDrink(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
    </div>
  );
}

export default CategoryButton;
