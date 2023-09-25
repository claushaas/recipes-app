import { useEffect, useState } from 'react';
import { MealDetails } from '../types';

type IngredientListProps = {
  recipe: MealDetails;
};

function IngredientList({ recipe }: IngredientListProps) {
  const lCInProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const actualInProgressRecipe = lCInProgressRecipe
    && lCInProgressRecipe[recipe.idMeal || recipe.idDrink];

  const [formValues, setFormValues] = useState(actualInProgressRecipe || {});
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

      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const newInProgressRecipes = {
        ...inProgressRecipes,
        ...inProgressRecipe,
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));

      return newState;
    });

    // const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
  };

  return (
    <div>
      <form>
        {
          ingredients?.map((ingredient, index) => {
            return (
              <div key={ index }>
                <label
                  htmlFor={ `ingredient-${index}` }
                  data-testid={ `${index}-ingredient-step` }
                  style={ { textDecoration: formValues[`ingredient-${index}`]
                    ? 'line-through' : 'none' } }
                >
                  <input
                    type="checkbox"
                    name={ `ingredient-${index}` }
                    onChange={ handleChange }
                    checked={ formValues[`ingredient-${index}`] }
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
      </form>
    </div>
  );
}

export default IngredientList;
