import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

function Recipes() {
  const { pathname } = useLocation();

  const { meals, drinks } = useSelector((state) => state);
  console.log(meals, drinks);

  const title = pathname === '/meals' ? 'Meals' : 'Drinks';
  return (
    <>
      <Header
        title={ title }
        showSearch
        showProfile
      />
      <div>Recipes</div>
    </>
  );
}

export default Recipes;
