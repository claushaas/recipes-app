import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../styles/header.css';
import prato from '../images/ícone-Recipes-app.png';
import food from '../images/foods.png';
import drinkImg from '../images/drinks.png';

type HeaderProps = {
  title: string;
  showSearch: boolean;
  showProfile: boolean;
};

function Header({ title, showSearch, showProfile }: HeaderProps) {
  const { pathname } = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="div-header">
      <header className="header">
        <div className="div-titulo">
          <img src={ prato } className="img-prato" alt="logo" />
          <h1 data-testid="page-title" className="h1">{title}</h1>
        </div>
        <div className="div-buttons">
          {showSearch && (
            <button onClick={ handleSearchClick } className="button-search">
              <img
                src={ searchIcon }
                alt="Pesquisar"
                data-testid="search-top-btn"
                className="img-search"
              />
            </button>
          )}
          {showProfile && (
            <button onClick={ handleProfileClick } className="button-profile">
              <img
                src={ profileIcon }
                alt="Perfil"
                data-testid="profile-top-btn"
                className="img-profile"
              />
            </button>
          )}
        </div>
      </header>
      {pathname === '/meals'
        ? (
          <div className="div-img">
            <img src={ food } alt="food" className="img-food" />
          </div>
        )
        : (
          <div className="div-img">
            <img src={ drinkImg } className="img-food" alt="drink" />
          </div>
        )}
      <div className="div-bar">
        {showSearchBar && <SearchBar />}
      </div>
    </div>
  );
}

export default Header;
