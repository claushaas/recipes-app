import '../styles/recipeCard.css';
import { Link } from 'react-router-dom';

type CardProps = {
  id: string;
  index: number;
  img: string;
  name: string;
};

function RecipeCard({ id, index, img, name }: CardProps) {
  return (
    <Link to={ id }>
      <div data-testid={ `${index}-recipe-card` } id="div-card">
        <img src={ img } alt={ name } data-testid={ `${index}-card-img` } id="img-card" />
        <p data-testid={ `${index}-card-name` } id="p-card">{name}</p>
      </div>
    </Link>
  );
}

export default RecipeCard;
