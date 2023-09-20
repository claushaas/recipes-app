import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

type HeaderProps = {
  title: string;
  showSearch: boolean;
  showProfile: boolean;
};

function Header({ title, showSearch, showProfile }: HeaderProps) {
  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      {showSearch && (
        <img src={ searchIcon } alt="Pesquisar" data-testid="search-top-btn" />
      )}
      {showProfile && (
        <Link to="/profile">
          <img src={ profileIcon } alt="Perfil" data-testid="profile-top-btn" />
        </Link>
      )}
    </header>
  );
}

export default Header;