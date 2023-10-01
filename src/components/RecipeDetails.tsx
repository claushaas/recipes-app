import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import Carousel from './Carousel';
import { RecipeDetailsType, ReduxState } from '../types';
import { fetchDrinks, fetchMeals, fetchRecipeDetails } from '../redux/actions';
import StartRecipeButton from './StartRecipeButton';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import '../styles/recipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const isMeal = window.location.pathname.startsWith('/meals');

  const details = useSelector((state: ReduxState) => {
    if (isMeal) {
      return state.recipeDetails.details?.meals?.[0] as RecipeDetailsType;
    }
    return state.recipeDetails.details?.drinks?.[0] as RecipeDetailsType;
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetails(id) as unknown as AnyAction);
    }
  }, [dispatch, id, isMeal]);

  useEffect(() => {
    if (isMeal) {
      dispatch(
        fetchDrinks('', 'name') as unknown as AnyAction,
      );
    } else {
      dispatch(
        fetchMeals('', 'name') as unknown as AnyAction,
      );
    }
  }, [dispatch, isMeal]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const ingredientsArray = [];
  for (let i = 1; i <= 99; i++) {
    const ingredient = details[`strIngredient${i}`];
    const measure = details[`strMeasure${i}`];
    if (ingredient) {
      ingredientsArray.push({ ingredient, measure });
    }
  }

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  const isDone = doneRecipes.some((recipe: any) => recipe.id === id);

  return (
    <div>
      <img
        className="recipe-img"
        src={ isMeal ? details.strMealThumb : details.strDrinkThumb }
        alt={ isMeal ? details.strMeal : details.strDrink }
        data-testid="recipe-photo"
      />
      <div className="buttons">
        <ShareButton />
        <FavoriteButton details={ details } />
      </div>
      <div className="content">
        <h1 data-testid="recipe-title">
          {isMeal ? details.strMeal : details.strDrink}
        </h1>
        { isMeal && details.strCategory && (
          <p data-testid="recipe-category">
            Category:
            {' '}
            {details.strCategory}
          </p>
        )}

        {!isMeal && details && details.strAlcoholic && (
          <p data-testid="recipe-category">
            Alcoholic:
            {' '}
            {details.strAlcoholic}
            {' '}
            {details.strCategory}
          </p>
        )}

        <h4>Ingredients:</h4>

        <ul>
          {ingredientsArray.map((ingredientObj, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredientObj.measure ? `${ingredientObj.measure} - ` : ''}
            ${ingredientObj.ingredient}`}
            </li>
          ))}
        </ul>

        <h4>Instructions:</h4>
        <p data-testid="instructions">
          {details.strInstructions}
        </p>

        {isMeal && details.strYoutube && (
          <iframe
            width="350"
            height="196"
            src={ details.strYoutube }
            title="YouTube video player"
            data-testid="video"
            frameBorder="0"
            allowFullScreen
          />
        )}
      </div>

      <div className="recommended">
        <h2>Recommended:</h2>
        <Carousel />

      </div>
      <StartRecipeButton isDone={ isDone } id={ id as string } />
    </div>
  );
}

export default RecipeDetails;
