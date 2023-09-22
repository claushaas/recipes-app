import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const emailUser = localStorage.getItem('user');

  const navigate = useNavigate();
  const handleClickRecipes = () => {
    navigate('/done-recipes');
  };

  const handleClickFavorite = () => {
    navigate('/favorite-recipes');
  };

  const handleClickLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Header title="Profile" showSearch={ false } showProfile />
      <h2 data-testid="profile-email">{ emailUser }</h2>
      <button
        data-testid="profile-done-btn"
        onClick={ handleClickRecipes }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ handleClickFavorite }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
