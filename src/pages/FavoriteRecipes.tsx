import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipies() {
  const [favoriteData, setFavoriteData] = useState<any[]>([]);

  const getFavoriteRecipes = () => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavoriteData(data);
  };

  const filterByCategory = (category: string) => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const filterData = data.filter((recipe: any) => recipe.type === category);
    setFavoriteData(filterData);
  };

  const removeFromFavorites = (id: string) => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newData = data.filter((recipe: any) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    setFavoriteData(newData);
  };

  const handleCopy = async (id: string, type: string) => {
    if (type === 'meal') {
      const URL = `http://localhost:3000/meals/${id}`;
      await navigator.clipboard.writeText(URL);
      Swal.fire('Link copied!');
    }
    if (type === 'drink') {
      const URL = `http://localhost:3000/drinks/${id}`;
      await navigator.clipboard.writeText(URL);
      Swal.fire('Link copied!');
    }
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  return (
    <>
      <Header title="Favorite Recipes" showSearch={ false } showProfile />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => getFavoriteRecipes() }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterByCategory('meal') }
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterByCategory('drink') }
        >
          Drinks
        </button>
      </div>

      {favoriteData.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              style={ { width: '100px' } }
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>
              <b>
                {recipe.name}
              </b>
            </p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
          </p>

          <button
            type="button"
            onClick={ () => handleCopy(recipe.id, recipe.type) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ shareIcon }
            />
          </button>

          <button
            type="button"
            onClick={ () => removeFromFavorites(recipe.id) }
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
