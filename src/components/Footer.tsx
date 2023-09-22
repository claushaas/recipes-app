import { useNavigate } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  const navigate = useNavigate();
  return (
    <footer data-testid="footer" className="footer">
      <button onClick={ () => navigate('/drinks') }>
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>
      <button onClick={ () => navigate('/meals') }>
        <img src={ mealIcon } alt="Meal Icon" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
