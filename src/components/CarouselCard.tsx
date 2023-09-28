import React from 'react';

function CarouselCard({ recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recommendation-card` }
      className="carousel-card"
    >
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />
      <p data-testid={ `${index}-recommendation-title` }>
        {recipe.strMeal || recipe.strDrink}
      </p>
    </div>
  );
}

export default CarouselCard;
