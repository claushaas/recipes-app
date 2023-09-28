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
    <div className="profile">
      <Header title="Profile" showSearch={ false } showProfile />
      <img src={ profileImg } alt="profile" className="profile-img" />
      <h1 className="h1-profile">PROFILE</h1>
      <h2 id="h2-profile" data-testid="profile-email">{ emailUser }</h2>
      <div className="div-buttons-profile">
        <button
          className="btn-done"
          data-testid="profile-done-btn"
          onClick={ handleClickRecipes }
        >
          <img src={ doneImg } alt="done" className="doneImg" />
          Done Recipes
        </button>
        <button
          className="btn-favorite"
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavorite }
        >
          <img src={ favoriteImg } alt="favorite" className="favoriteImg" />
          Favorite Recipes
        </button>
        <button
          className="btn-logout"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogout }
        >
          <img src={ logoutImg } alt="logout" className="logoutImg" />
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
