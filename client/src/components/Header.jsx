import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../hooks/useAuth';
import DropdownMenu from './DropdownMenu';
import userService from '../services/user';

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
    navigate('/');
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    userService.getProfile();
  }

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  let authButtons;

  if (isAuthenticated === false) {
    authButtons = (
      <>
        <li>
          <a className='text-md hover' onClick={handleLoginClick}>
            Log in
          </a>
        </li>
        <li>
          <a className='text-md hover' onClick={handleRegisterClick}>
            New? Sign up
          </a>
        </li>
      </>
    );
  } else if (isAuthenticated === true) {
    authButtons = (
      <>
        <li>
          <a className='text-md hover' onClick={handleLogoutClick}>
            Logout
          </a>
        </li>
        <li>
          <a onClick={handleProfileClick}>
            <FontAwesomeIcon icon={['fas', 'user']} size="3x" />
          </a>
        </li>
      </>
    );
  }

  return (
    <header className="header">
      <nav className="navigation container">
        <ul className="navigation__list">
          <div className="header__left">
            <li>
              <a className="icon-button" onClick={handleMenuClick}>
                <FontAwesomeIcon icon={['fas', 'bars']} size="3x" />
              </a>
              {menu && <DropdownMenu />}
            </li>
            <li>
              <h1 className="logo">
                <a href="/">
                  <img src="src/assets/static/logo.png" alt="Logo" />
                </a>
              </h1>
            </li>
          </div>
          <div className="header__right">
            <li>
              <a className='text-md hover' href="/">Home</a>
            </li>
            <li>
              <a className='text-md hover' href="/favourites">Favourites</a>
            </li>
            {authButtons}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
