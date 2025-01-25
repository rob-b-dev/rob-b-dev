import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from './AuthContext';
import DropdownMenu from './DropdownMenu';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logout();
    navigate('/home');
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  let authButtons;

  if (isAuthenticated === false) {
    authButtons = (
      <>
        <li>
          <button className="button button__primary" onClick={handleLoginClick}>
            Log in
          </button>
        </li>
        <li>
          <button className="button button__primary" onClick={handleRegisterClick}>
            New? Sign up
          </button>
        </li>
      </>
    );
  } else if (isAuthenticated === true) {
    authButtons = (
      <li>
        <button className="icon-button" onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={['fas', 'user']} size="3x" />
        </button>
      </li>
    );
  }

  return (
    <header className="header">
      <nav className="navigation">
        <ul className="navigation__list">
          <div className="header__left">
            <li>
              <button className="icon-button" onClick={handleMenuClick}>
                <FontAwesomeIcon icon={['fas', 'bars']} size="3x" />
              </button>
              {menu && <DropdownMenu />}
            </li>
            <li>
              <h1 className="logo">
                <a href="/home">
                  <img src="src/assets/static/logo.png" alt="Logo" />
                </a>
              </h1>
            </li>
          </div>
          <div className="header__right">
            <li>
              <a href="/home"><button className="button button__primary">Home</button></a>
            </li>
            <li>
              <a href="/favourites"><button className="button button__primary">Favourites</button></a>
            </li>
            {authButtons}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
