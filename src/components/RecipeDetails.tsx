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
import Beef from '../images/icons/Beef.png';
import Goat from '../images/icons/Goat.png';
import Chicken from '../images/icons/Chicken.png';
import Breakfast from '../images/icons/Breakfast.png';
import Dessert from '../images/icons/Dessert.png';
import Ordinary from '../images/icons/Drink.png';
import Cocktail from '../images/icons/Cocktail.png';
import Shake from '../images/icons/Shake.png';
import Other from '../images/icons/Other.png';
import Cocoa from '../images/icons/Cocoa.png';

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
    <div className="div-recipedetails">
      <div className="divLeft">
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
        { isMeal && details.strCategory && (
          <div className="div-details-category-img">
            <img
              alt={ details.strCategory }
              className="img-category-class-details"
              src={ iconsMeals[details.strCategory] }
            />
            <p data-testid="recipe-category" className="category-p-datails">
              {details.strCategory}
            </p>
          </div>
        )}

        {!isMeal && details && details.strAlcoholic && (
          <div className="div-details-category-img">
            <img
              alt={ details.strCategory }
              className="img-category-class-details"
              src={ iconsDrinks[details.strCategory] }
            />
            <p data-testid="recipe-category" className="category-p-datails">
              {details.strAlcoholic}
              {' '}
              {details.strCategory}
            </p>
          </div>
        )}
        <h1 data-testid="recipe-title" className="spaceText">
          {isMeal ? details.strMeal : details.strDrink}
        </h1>
      </div>
      <div className="content-div-container">
        <h2>Ingredients:</h2>

        <div className="div-ingredients">
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
        </div>

        <h2>Instructions:</h2>
        <div className="div-instructions">
          <p data-testid="instructions">
            {details.strInstructions}
          </p>
        </div>

        {isMeal && details.strYoutube && (
          <div>
            <h2>Video:</h2>
            <video
              src={ details.strYoutube }
              controls
              className="youtube-video"
            >
              <p>
                Your browser doesnt support HTML5 video. Here is a
                <a href={ details.strYoutube }>link to the video</a>
                instead.
              </p>
            </video>
          </div>

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
