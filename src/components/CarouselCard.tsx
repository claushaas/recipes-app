import '../styles/carousel.css';

type CarouselCardProps = {
  recipe: {
    strMealThumb: string;
    strMeal: string;
    strDrinkThumb: string;
    strDrink: string;
  };
  index: number;
};

function CarouselCard({ recipe, index }: CarouselCardProps) {
  return (
    <div
      data-testid={ `${index}-recommendation-card` }
      className="carousel-card"
    >
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        className="carousel-card-image"
      />
      <p data-testid={ `${index}-recommendation-title` }>
        {recipe.strMeal || recipe.strDrink}
      </p>
    </div>
  );
}

export default CarouselCard;
