import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

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
  const { pathname } = useLocation();

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('doneRecipes') ?? '[]');
    setDoneRecipes(storedRecipes);
  }, []);
  const handleClick = async () => {
    const url = `http://localhost:3000${pathname}`;
    await navigator.clipboard.writeText(url);
    Swal.fire('Link copied!');
  };

  const filteredRecipes = filter === 'all' ? DoneRecipes
    : DoneRecipes.filter((recipe) => recipe.type === filter);

  return (
    <div>
      <Header title="Done Recipes" showSearch={ false } showProfile />
      <button
        onClick={ () => setFilter('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => setFilter('meals') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => setFilter('drinks') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { filteredRecipes.map((recipe, index) => (

        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type
            === 'meal' ? `${recipe.nationality} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>

          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            data-testid={ `${index}-horizontal-share-button` }
            onClick={ handleClick }
          >
            <img src={ shareIcon } alt="share button" />
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
    </div>

  );
}

export default DoneRecipies;
