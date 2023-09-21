import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

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
    <header>
      <h1 data-testid="page-title">{title}</h1>
      {showSearch && (
        <button onClick={ handleSearchClick }>
          <img
            src={ searchIcon }
            alt="Pesquisar"
            data-testid="search-top-btn"
          />
        </button>
      )}
      {showProfile && (
        <button onClick={ handleProfileClick }>
          <img
            src={ profileIcon }
            alt="Perfil"
            data-testid="profile-top-btn"
          />
        </button>
      )}
      {showSearchBar && <SearchBar />}
    </header>
  );
}

export default Header;
