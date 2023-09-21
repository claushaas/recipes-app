import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { Drink, Meal } from '../types';

function Recipes() {
  const { pathname } = useLocation();

  const { meals, drinks } = useSelector((state) => state);

  const title = pathname === '/meals' ? 'Meals' : 'Drinks';
  return (
    <>
      <Header
        title={ title }
        showSearch
        showProfile
      />
      {pathname === '/meals' && meals.meals.slice(0, 12)
        .map((meal: Meal, index: number) => (
          <RecipeCard
            key={ index }
            index={ index }
            img={ meal.strMealThumb }
            name={ meal.strMeal }
          />
        ))}
      {pathname === '/drinks' && drinks.drinks.slice(0, 12)
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
