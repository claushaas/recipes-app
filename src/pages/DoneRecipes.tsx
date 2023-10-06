import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import All from '../images/AllFoods.png';
import Food from '../images/foodsRecipes.png';
import Drinks from '../images/drinksRecipes.png';
import '../styles/doneRecipes.css';
import doneImg from '../images/Group 10.png';
import Footer from '../components/Footer';

type DoneRecipesType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[],
};
function DoneRecipies() {
  const [DoneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('doneRecipes') ?? '[]');
    setDoneRecipes(storedRecipes);
  }, []);

  const handleClick = async (recipe: DoneRecipesType) => {
    let url;
    if (recipe.type === 'meal') {
      url = `http://localhost:3000/meals/${recipe.id}`;
    }
    if (recipe.type === 'drink') {
      url = `http://localhost:3000/drinks/${recipe.id}`;
    }
    await navigator.clipboard.writeText(url as string);
    Swal.fire('Link copied!');
  };

  const filteredRecipes = filter === 'all' ? DoneRecipes
    : DoneRecipes.filter((recipe) => recipe.type === filter);

  return (
    <div className="div-content-donerecipes">
      <Header title="Done Recipes" showSearch={ false } showProfile />
      <div className="div-donerecipes">
        <img src={ doneImg } alt="done" className="doneImgrecipes" />
        <h1 className="h1-done">DONE RECIPES</h1>
      </div>
      <div className="div-buttons-donerecipes">
        <button
          onClick={ () => setFilter('all') }
          data-testid="filter-by-all-btn"
          className="btn-All"
        >
          <img src={ All } className="imgAll" alt="imgall" />
        </button>
        <button
          onClick={ () => setFilter('meal') }
          data-testid="filter-by-meal-btn"
          className="btn-Food"
        >
          <img src={ Food } className="imgFood" alt="imgfood" />
        </button>
        <button
          onClick={ () => setFilter('drink') }
          data-testid="filter-by-drink-btn"
          className="btn-Drinks"
        >
          <img src={ Drinks } className="imgDrinks" alt="imgdrinks" />
        </button>
      </div>
      { filteredRecipes.map((recipe, index) => (
        <div key={ index } className="div-content-done-recipes">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              className="img-div-recipes-done"
            />
          </Link>
          <div>
            <Link to={ `/${recipe.type}s/${recipe.id}` } className="linkrecipesh2">
              <h2
                data-testid={ `${index}-horizontal-name` }
                className="h2recipesdone"
              >
                {recipe.name}
              </h2>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` } className="p-div-category">
              {recipe.type
              === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          </div>
          <button onClick={ () => handleClick(recipe) } className="btn-comp-done">
            <img
              style={ { width: '30' } }
              src={ shareIcon }
              alt="share button"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {recipe.tags && recipe.tags.map((tagName) => (
            <p
              key={ tagName }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              {tagName}
            </p>
          ))}
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default DoneRecipies;
