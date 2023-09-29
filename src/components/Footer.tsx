import { useNavigate } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  const navigate = useNavigate();
  return (
    <footer data-testid="footer" className="footer">
      <button onClick={ () => navigate('/drinks') } className="botton-1">
        <img
          src={ drinkIcon }
          alt="Drink Icon"
          data-testid="drinks-bottom-btn"
          className="img-booton-1"
        />
      </button>
      <button onClick={ () => navigate('/meals') } className="botton-2">
        <img
          src={ mealIcon }
          alt="Meal Icon"
          data-testid="meals-bottom-btn"
          className="img-booton-2"
        />
      </button>
    </footer>
  );
}

export default Footer;
