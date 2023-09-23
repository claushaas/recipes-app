import { useEffect } from 'react';

function CategoryButton() {
  useEffect(() => {
    const mealsAPI = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(URL);
      const data = await response.json();

      return console.log(data.meals);
    };

    mealsAPI();

    const drinksAPI = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(URL);
      const data = await response.json();

      return console.log(data.drinks);
    };

    drinksAPI();
  }, []);

  return (
    <div>CategoryButton</div>
  );
}

export default CategoryButton;
