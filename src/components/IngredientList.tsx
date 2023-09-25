import { MealDetails } from '../types';

type IngredientListProps = {
  recipe: MealDetails;
};

function IngredientList({ recipe }: IngredientListProps) {
  console.log(recipe);

  const ingredients = Object.entries(recipe).filter((entry) => {
    return entry[0].includes('strIngredient') && entry[1] !== '' && entry[1] !== null;
  });
  console.log(ingredients);
  return (
    <div>
      {
        ingredients?.map((ingredient, index) => {
          return (
            <div key={ index }>
              <label
                htmlFor={ `ingredient-${index}` }
                data-testid={ `${index}-ingredient-step` }
              >
                <input type="checkbox" name={ `ingredient-${index}` } />
                <span data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${ingredient[1]} - `}
                  {`${recipe[`strMeasure${index + 1}`]}`}
                </span>

              </label>
            </div>
          );
        })
        }
    </div>
  );
}

export default IngredientList;
