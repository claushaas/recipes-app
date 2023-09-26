import { useNavigate } from 'react-router-dom';

type CardProps = {
  id: string;
  index: number;
  img: string;
  name: string;
};

function RecipeCard({ id, index, img, name }: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    const route = id.startsWith('meal') ? `/meals/${id}` : `/drinks/${id}`;
    navigate(route);
  }; const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };
  return (
    <div
      role="button"
      tabIndex={ 0 }
      onClick={ handleClick }
      onKeyPress={ handleKeyPress }
      data-testid={ `${index}-recipe-card` }
    >
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

export default RecipeCard;
