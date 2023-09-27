import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function ShareButton() {
  const { pathname } = useLocation();

  const handleClick = async () => {
    const url = `http://localhost:3000${pathname}`;
    await navigator.clipboard.writeText(url);
    Swal.fire('Link copied!');
  };

  return (
    <button
      data-testid="share-btn"
      onClick={ handleClick }
    >
      Share

    </button>
  );
}

export default ShareButton;
