import { useSelector } from 'react-redux';
import { RecipeDetailsType, ReduxState } from '../types';

function FavoriteButton() {
  const details = useSelector((state: ReduxState) => {
    return state.recipeDetails.details?.meals?.[0] as RecipeDetailsType
      || state.recipeDetails.details?.drinks?.[0] as RecipeDetailsType;
  });

  const favoriteRecipes = JSON.parse(
    localStorage.getItem('favoriteRecipes') as string,
  ) || [];

  const handleClick = () => {
    const newFavoriteRecipe = {
      id: details.idMeal || details.idDrink,
      type: details.idMeal ? 'meal' : 'drink',
      nationality: details.strArea || '',
      category: details.strCategory || '',
      alcoholicOrNot: details.strAlcoholic || '',
      name: details.strMeal || details.strDrink,
      image: details.strMealThumb || details.strDrinkThumb,
    };

    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...favoriteRecipes, newFavoriteRecipe]),
    );
  };

  return (
    <button
      data-testid="favorite-btn"
      onClick={ handleClick }
    >
      Favorite
    </button>
  );
}

export default FavoriteButton;
