type CardProps = {
  index: number;
  img: string;
  name: string;
};

function RecipeCard({ index, img, name }: CardProps) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

export default RecipeCard;
