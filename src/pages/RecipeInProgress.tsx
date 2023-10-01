import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { MealDetails } from '../types';
import IngredientList from '../components/IngredientList';

import '../styles/recipeInProgress.css';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

function MealProgress() {
  const [recipe, setRecipe] = useState({} as MealDetails);
  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchRecipe = async () => {
      let URL = '';
      if (pathname.includes('meals')) {
        URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else {
        URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      const response = await fetch(URL);
      const data = await response.json();
      if (pathname.includes('meals')) {
        setRecipe(data.meals[0]);
      } else {
        setRecipe(data.drinks[0]);
      }
    };

    fetchRecipe();
  }, [id, pathname]);
  return (
    <div>
      <img
        className="recipe-img"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid="recipe-photo"
      />
      <ShareButton />
      <FavoriteButton details={ recipe } />
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      <p data-testid="recipe-category">
        Categoria
        {' '}
        {recipe.strCategory}
      </p>
      <p data-testid="instructions">Instructions</p>
      <p>{recipe.strInstructions}</p>
      <p>Ingredients</p>
      {(recipe.idMeal || recipe.idDrink) && <IngredientList recipe={ recipe } />}
    </div>
  );
}

export default MealProgress;
