import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Carousel() {
  const meals = useSelector((state: ReduxState) => state.meals);
  const drinks = useSelector((state: ReduxState) => state.drinks);
  console.log(meals);
  console.log(drinks);

  return (
    <div>Carousel</div>
  );
}

export default Carousel;
