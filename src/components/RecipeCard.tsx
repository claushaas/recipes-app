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
    <Link to={ id } className="link">
      <div data-testid={ `${index}-recipe-card` } className="div-card">
        <img
          src={ img }
          alt={ name }
          data-testid={ `${index}-card-img` }
          className="img-card"
        />
        <p data-testid={ `${index}-card-name` } className="p-card">{name}</p>
      </div>
    </Link>
  );
}

export default RecipeCard;
