import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

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
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') ?? '[]');
    setDoneRecipes(doneRecipes);
  }, []);

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
        <div key={ index } />

      ))}
    </div>

  );
}

export default DoneRecipies;
