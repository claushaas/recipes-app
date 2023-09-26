import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { ReduxState } from '../types';
import { fetchRecipeDetails } from '../redux/actions';
// Define the RecipeDetails component
function RecipeDetails() {
  const { 'id-da-receita': recipeId } = useParams();
  const dispatch = useDispatch();

  // Determine if it's a meal or drink based on the route
  const isMeal = window.location.pathname.startsWith('/meals');

  // Use the useSelector hook to access details from Redux store
  const details = useSelector((state: ReduxState) => {
    if (isMeal) {
      return state.meals.meals[0];
    }
    return state.drinks.drinks[0];
  });

  useEffect(() => {
    if (recipeId) {
      // Fetch recipe details when the component mounts
      dispatch(fetchRecipeDetails(recipeId) as ThunkAction<void, ReduxState, null, any>);
    }
  }, [dispatch, recipeId, isMeal]);

  return (
    <div>
      {/* Recipe image */}
      <img
        src={ isMeal ? details.strMealThumb : details.strDrinkThumb }
        alt={ isMeal ? details.strMeal : details.strDrink }
        data-testid="recipe-photo"
      />

      {/* Recipe title */}
      <h1 data-testid="recipe-title">
        {isMeal ? details.strMeal : details.strDrink}
      </h1>

      {/* Recipe category */}
      {isMeal && details.strCategory && (
        <p data-testid="recipe-category">
          Category:
          {' '}
          {details.strCategory}
        </p>
      )}

      {/* Alcoholic info (for drinks) */}
      {!isMeal && details.strAlcoholic && (
        <p data-testid="recipe-category">
          Alcoholic:
          {' '}
          {details.strAlcoholic}
        </p>
      )}

      {/* Ingredients */}
      <h2>Ingredients:</h2>
      <ul>
        {Array.from({ length: 20 }, (_, index) => {
          const ingredient = details[`strIngredient${index + 1}`];
          const measure = details[`strMeasure${index + 1}`];
          if (ingredient && measure) {
            return (
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${measure}`}
              </li>
            );
          }
          return null;
        })}
      </ul>

      {/* Instructions */}
      <h2>Instructions:</h2>
      <p data-testid="instructions">
        {details.strInstructions}
      </p>

      {/* Video (only for meals) */}
      {isMeal && (
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

      {/* Recommendations (you can implement this part based on your requirements) */}
      <h2>Recommendations:</h2>
      {/* Implement recommendations here */}

    </div>
  );
}

export default RecipeDetails;
