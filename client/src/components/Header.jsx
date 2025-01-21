import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from './AuthContext'; // Import the useAuth hook to access authenticated state and functions
import DropdownMenu from './DropdownMenu';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Access the isAuthenticated state and the logout function from context provider
  const [menu, setShowMenu] = useState(false)

  const handleMenuClick = () => {
    setShowMenu((prev) => !prev)
  }

  const handleLoginClick = (e) => {
    // Prevents page reload - e represents the event 
    e.preventDefault();
    navigate('/login')
  }

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logout(); // Call logout function from context
    navigate('/home'); // Redirect to home on logout
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <header className="header">
      <nav className="navigation">
        <ul className="navigation__list">
          <div className="header__left">
            <li>
              <button className="icon-button"
                onClick={handleMenuClick}
              >
                <FontAwesomeIcon icon={['fas', 'bars']} size="3x" />
              </button>
              {menu && (
                <DropdownMenu />
              )}
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
            {/* Conditionally render elements based on authorization state */}
            {!isAuthenticated ? (
              <>
                <li>
                  <button className="button button__primary" onClick={handleLoginClick}>
                    Log in
                  </button>
                </li>
                <li>
                  <button className='button button__primary' onClick={handleRegisterClick}>
                    New? Sign up
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button className="icon-button" onClick={handleLogoutClick}>
                  <FontAwesomeIcon icon={['fas', 'user']} size="3x" />
                </button>
                {/* <button className='button button__primary' onClick={handleLogoutClick}>Log out</button> */}
              </li>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
