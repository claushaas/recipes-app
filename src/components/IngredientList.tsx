import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MealDetails } from '../types';

type IngredientListProps = {
  recipe: MealDetails;
};

function IngredientList({ recipe }: IngredientListProps) {
  const navigate = useNavigate();
  const lCInProgressRecipe = JSON.parse(
    localStorage.getItem('inProgressRecipes') as string,
  );
  const actualInProgressRecipe = lCInProgressRecipe
    && lCInProgressRecipe[recipe.idMeal || recipe.idDrink];

  const ingredientsKeys = Object.keys(recipe).filter((key) => {
    return key.includes('strIngredient') && recipe[key] !== '' && recipe[key] !== null;
  });

  const INITIAL_STATE = ingredientsKeys.reduce(
    (acc, ingredient) => {
      return {
        ...acc,
        [ingredient]: actualInProgressRecipe ? actualInProgressRecipe[ingredient] : false,
      };
    },
    {},
  );

  const [formValues, setFormValues] = useState(actualInProgressRecipe || INITIAL_STATE);
  const ingredients = Object.entries(recipe).filter((entry) => {
    return entry[0].includes('strIngredient') && entry[1] !== '' && entry[1] !== null;
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, type } = event.target;
    const value = type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.value;
    setFormValues((formValues2: any) => {
      const newState = {
        ...formValues2,
        [name]: value,
      };

      const inProgressRecipe = {
        [recipe.idMeal || recipe.idDrink]: newState,
      };

      const inProgressRecipes = JSON.parse(
        localStorage.getItem('inProgressRecipes') as string,
      );

      const newInProgressRecipes = {
        ...inProgressRecipes,
        ...inProgressRecipe,
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));

      return newState;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') as string);

    const doneRecipe = {
      id: recipe.idMeal || recipe.idDrink,
      type: recipe.idMeal ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate: new Date(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };

    let newDoneRecipes = [];
    if (doneRecipes) {
      newDoneRecipes = [
        ...doneRecipes,
        doneRecipe,
      ];
    } else {
      newDoneRecipes = [
        doneRecipe,
      ];
    }

    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    navigate('/done-recipes');
  };

  const enableFinishRecipeButton = () => {
    return formValues && Object.values(formValues).every((value) => value === true);
  };

  return (
    <div>
      <form
        onSubmit={ handleSubmit }
      >
        {
          ingredients?.map((ingredient, index) => {
            return (
              <div key={ index }>
                <label
                  htmlFor={ ingredient[0] }
                  data-testid={ `${index}-ingredient-step` }
                  style={ { textDecoration: formValues[ingredient[0]]
                    ? 'line-through' : 'none' } }
                >
                  <input
                    type="checkbox"
                    name={ ingredient[0] }
                    onChange={ handleChange }
                    checked={ formValues[ingredient[0]] }
                  />
                  <span
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${ingredient[1]} - `}
                    {`${recipe[`strMeasure${index + 1}`]}`}
                  </span>
                </label>
              </div>
            );
          })
        }
        <button
          disabled={ !enableFinishRecipeButton() }
          data-testid="finish-recipe-btn"
          type="submit"
        >
          Finish Recipe
        </button>
      </form>
    </div>
  );
}

export default IngredientList;
