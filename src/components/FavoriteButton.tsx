import { useParams } from 'react-router-dom';
import { useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

type FavoriteButtonProps = {
  details: any;
};

function FavoriteButton({ details }: FavoriteButtonProps) {
  const favoriteRecipes = JSON.parse(
    localStorage.getItem('favoriteRecipes') as string,
  ) || [];

  const { id } = useParams();

  const isFavorite = favoriteRecipes.some((recipe: any) => recipe.id === id);

  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

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

    if (isFavoriteState) {
      const newFavoriteRecipes = favoriteRecipes.filter(
        (recipe: any) => recipe.id !== id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setIsFavoriteState(false);
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favoriteRecipes, newFavoriteRecipe]),
      );
      setIsFavoriteState(true);
    }
  };

  return (
    <button
      onClick={ handleClick }
    >
      {
        isFavoriteState
          ? <img data-testid="favorite-btn" src={ blackHeartIcon } alt="favorite" />
          : <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite" />
      }
    </button>
  );
}

export default FavoriteButton;
