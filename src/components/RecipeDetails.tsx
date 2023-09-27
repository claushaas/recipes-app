import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import Carousel from './Carousel';
import { RecipeDetailsType, ReduxState } from '../types';
import { fetchDrinks, fetchMeals, fetchRecipeDetails } from '../redux/actions';

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
      dispatch(fetchRecipeDetails(id as string) as
      ThunkAction<void, ReduxState, null, any>);
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
  }, []);

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

  return (
    <div>
      <img
        src={ isMeal ? details.strMealThumb : details.strDrinkThumb }
        alt={ isMeal ? details.strMeal : details.strDrink }
        data-testid="recipe-photo"
      />
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

      <h2>Ingredients:</h2>

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

      <h2>Instructions:</h2>
      <p data-testid="instructions">
        {details.strInstructions}
      </p>

      {isMeal && details.strYoutube && (
        <iframe
          width="560"
          height="315"
          src={ details.strYoutube }
          title="YouTube video player"
          data-testid="video"
          frameBorder="0"
          allowFullScreen
        />
      )}

      <h2>Recommendations:</h2>
      <Carousel />
      <button
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0' } }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;
