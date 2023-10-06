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
      <div className="divLeft">
        <img
          className="recipe-img"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          data-testid="recipe-photo"
        />
        <div className="buttons">
          <ShareButton />
          <FavoriteButton details={ recipe } />
        </div>
        <div className="content">
          <h1
            data-testid="recipe-title"
            className="spaceText-h1"
          >
            {recipe.strMeal || recipe.strDrink}
          </h1>
          <p data-testid="recipe-category" className="spaceText-p">
            {recipe.strCategory}
          </p>
        </div>
      </div>
      <div className="div-content-progress">
        <h2 data-testid="instructions">Instructions</h2>
        <p className="p-instructions-progress">{recipe.strInstructions}</p>
        <h2>Ingredients</h2>
        <div className="div-content-check">
          {(recipe.idMeal || recipe.idDrink) && <IngredientList recipe={ recipe } />}
        </div>
      </div>
    </div>
  );
}

export default MealProgress;
