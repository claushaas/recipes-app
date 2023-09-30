import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipies() {
  const [favoriteData, setFavoriteData] = useState<any[]>([]);
  const [toggleMeal, setToggleMeal] = useState<boolean>(false);
  const [toggleDrink, setToggleDrink] = useState<boolean>(false);

  const filterByCategoryMeal = (category: string) => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const filterData = data.filter((recipe: any) => recipe.type === category);
    setFavoriteData(filterData);
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

  const removeFavorite = (id: string) => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newData = data.filter((recipe: any) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    setFavoriteData(newData);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavoriteData(data);
    console.log(data);
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
          onClick={ () => filterByCategoryMeal('meal') }
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterByCategoryMeal('drink') }
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
            onClick={ () => removeFavorite(recipe.id) }
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
