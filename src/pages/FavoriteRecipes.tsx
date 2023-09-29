import { useEffect, useState } from 'react';
import Header from '../components/Header';

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
            {recipe.category}
          </p>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Compartilhar
          </button>

          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            Favoritar
          </button>
        </div>
      ))}
    </>
  );
}

export default FavoriteRecipies;
