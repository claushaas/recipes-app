import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { RecipeDetails, ReduxState } from '../types';
import { fetchRecipeDetails } from '../redux/actions';

function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const isMeal = window.location.pathname.startsWith('/meals');

  const details = useSelector((state: ReduxState) => {
    // if (isMeal) {
    return state.recipeDetails.details as RecipeDetails;
    // }
    // return state.recipeDetails.details as DrinkDetails | undefined;
  });
  console.log(details);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetails(id as string) as
      ThunkAction<void, ReduxState, null, any>);
    }
  }, [dispatch, id, isMeal]);

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
        src={ isMeal ? details.meals[0].strMealThumb : details.drinks[0].strDrinkThumb }
        alt={ isMeal ? details.meals[0].strMeal : details.drinks[0].strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        {isMeal ? details.meals[0].strMeal : details.drinks[0].strDrink}
      </h1>

      {isMeal && details.strCategory && (
        <p data-testid="recipe-category">
          Category:
          {' '}
          {details.strCategory}
        </p>
      )}

      {!isMeal && details.strAlcoholic && (
        <p data-testid="recipe-category">
          Alcoholic:
          {' '}
          {details.strAlcoholic}
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

    </div>
  );
}

export default RecipeDetails;
