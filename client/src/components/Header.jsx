import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from './AuthContext'; // Import the useAuth hook to access authenticated state and functions

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Access the isAuthenticated state and the logout function from context provider

  const handleProfileClick = () => {

  }

  const handleLoginClick = (e) => {
    // Prevents page reload
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
              >
                <FontAwesomeIcon icon={['fas', 'bars']} size="3x" />
              </button>
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
              <button className="button button__primary">Favourites</button>
            </li>
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
