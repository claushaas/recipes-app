import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileImg from '../images/Perfil.png';
import '../styles/profile.css';
import doneImg from '../images/Group 10.png';
import favoriteImg from '../images/Group 9.png';
import logoutImg from '../images/Group 8.png';

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
    <div id="profile">
      <Header title="Profile" showSearch={ false } showProfile />
      <img src={ profileImg } alt="profile" id="profile-img" />
      <h1 id="h1-profile">PROFILE</h1>
      <h2 id="h2-profile" data-testid="profile-email">{ emailUser }</h2>
      <div id="div-buttons-profile">
        <button
          id="btn-done"
          data-testid="profile-done-btn"
          onClick={ handleClickRecipes }
        >
          <img src={ doneImg } alt="done" id="doneImg" />
          Done Recipes
        </button>
        <button
          id="btn-favorite"
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavorite }
        >
          <img src={ favoriteImg } alt="favorite" id="favoriteImg" />
          Favorite Recipes
        </button>
        <button
          id="btn-logout"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogout }
        >
          <img src={ logoutImg } alt="logout" id="logoutImg" />
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
