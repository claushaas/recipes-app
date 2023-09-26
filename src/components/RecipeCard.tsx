import '../styles/recipeCard.css';

type CardProps = {
  index: number;
  img: string;
  name: string;
};

function RecipeCard({ index, img, name }: CardProps) {
  return (
    <div data-testid={ `${index}-recipe-card` } id="div-card">
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } id="img-card" />
      <p data-testid={ `${index}-card-name` } id="p-card">{name}</p>
    </div>
  );
}

export default RecipeCard;
