import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../styles/header.css';
import prato from '../images/ícone-Recipes-app.png';

type HeaderProps = {
  title: string;
  showSearch: boolean;
  showProfile: boolean;
};

function Header({ title, showSearch, showProfile }: HeaderProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div id="div-header">
      <header id="header">
        <div id="div-titulo">
          <img src={ prato } id="img-prato" alt="logo" />
          <h1 data-testid="page-title" id="h1">{title}</h1>
        </div>
        <div id="div-buttons">
          {showSearch && (
            <button onClick={ handleSearchClick } id="button-search">
              <img
                src={ searchIcon }
                alt="Pesquisar"
                data-testid="search-top-btn"
                id="img-search"
              />
            </button>
          )}
          {showProfile && (
            <button onClick={ handleProfileClick } id="button-profile">
              <img
                src={ profileIcon }
                alt="Perfil"
                data-testid="profile-top-btn"
                id="img-profile"
              />
            </button>
          )}
        </div>
      </header>
      <div id="div-bar">
        {showSearchBar && <SearchBar />}
      </div>
    </div>
  );
}

export default Header;
