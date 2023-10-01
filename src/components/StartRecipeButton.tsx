import { Link } from 'react-router-dom';

type StartRecipeButtonProps = {
  isDone: boolean;
  id: string;
};

function StartRecipeButton({ isDone, id }: StartRecipeButtonProps) {
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes') as string,
  );
  const inProgressMeals = Object.keys(inProgressRecipes?.meals || {});
  const inProgressDrinks = Object.keys(inProgressRecipes?.drinks || {});

  const isInProgress = inProgressMeals.includes(id) || inProgressDrinks.includes(id);

  if (isDone) {
    return null;
  }

  return (
    <Link to="in-progress">
      <button
        className="finish-recipe-btn"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0' } }
      >
        { isInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </Link>
  );
}

export default StartRecipeButton;
