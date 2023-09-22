type CardProps = {
  id: string;
  index: number;
  img: string;
  name: string;
};

function RecipeCard({ id, index, img, name }: CardProps) {
  return (
    <a href={ id }>
      <div data-testid={ `${index}-recipe-card` }>
        <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </div>
    </a>
  );
}

export default RecipeCard;
