import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const { pathname } = useLocation();

  const handleClick = async () => {
    const url = `http://localhost:3000${pathname.split('/').slice(0, 3).join('/')}`;
    await navigator.clipboard.writeText(url);
    Swal.fire('Link copied!');
  };

  return (
    <button
      data-testid="share-btn"
      onClick={ handleClick }
    >
      <img src={ shareIcon } alt="Share" />
    </button>
  );
}

export default ShareButton;
