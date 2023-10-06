import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import All from '../images/AllFoods.png';
import Food from '../images/foodsRecipes.png';
import Drinks from '../images/drinksRecipes.png';
import '../styles/favoriteRecipes.css';
import doneImg from '../images/Group 10.png';

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
      <div className="div-donerecipes">
        <img src={ doneImg } alt="done" className="doneImgrecipes" />
        <h1 className="h1-done">FAVORITE RECIPES</h1>
      </div>
      <div className="div-favoritesrecipes">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => getFavoriteRecipes() }
          className="btn-All"
        >
          <img src={ All } className="imgAll" alt="imgall" />
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterByCategory('meal') }
          className="btn-Food"
        >
          <img src={ Food } className="imgFood" alt="imgfood" />
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterByCategory('drink') }
          className="btn-Drinks"
        >
          <img src={ Drinks } className="imgDrinks" alt="imgdrinks" />
        </button>
      </div>

      {favoriteData.map((recipe, index) => (
        <div key={ index } className="div-content-done-recipes">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              className="img-div-recipes-done"
            />
          </Link>
          <div className="div-favorites-text">
            <Link to={ `/${recipe.type}s/${recipe.id}` } className="linkrecipesh2">
              <h1 data-testid={ `${index}-horizontal-name` } className="h2recipesdone">
                <b>{recipe.name}</b>
              </h1>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` } className="p-div-category">
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
            </p>
          </div>

          <div className="div-buttons-favorites">
            <button
              type="button"
              onClick={ () => handleCopy(recipe.id, recipe.type) }
              className="btn-comp-done"
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
              className="btn-comp-done"
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt={ blackHeartIcon }
              />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default FavoriteRecipies;
