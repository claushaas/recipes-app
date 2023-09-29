import { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipies() {
  const [favoriteData, setFavoriteData] = useState<any[]>([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavoriteData(data);
  }, []);

  return (
    <>
      <Header title="Favorite Recipes" showSearch={ false } showProfile />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>

      {favoriteData.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-name` }>
            <b>
              {recipe.name}
            </b>
          </p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
          </p>

          <button
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ shareIcon }
            />
          </button>

          <button
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt={ blackHeartIcon }
            />
          </button>
        </div>
      ))}
    </>
  );
}

export default FavoriteRecipies;
