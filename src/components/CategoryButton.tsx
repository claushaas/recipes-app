import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const mealsAPI = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(URL);
      const data = await response.json();

      setCategoryMeal(data.meals);
    };

    mealsAPI();

    const drinksAPI = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(URL);
      const data = await response.json();

      setCategoryDrink(data.drinks);
    };

    drinksAPI();
  }, []);

  return (
    <div>
      {pathname === '/meals' && categoryMeal?.slice(0, 5)
        .map((category: CategoryMealType, index: number) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
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
          >
            {category.strCategory}
          </button>
        ))}
    </div>
  );
}

export default CategoryButton;