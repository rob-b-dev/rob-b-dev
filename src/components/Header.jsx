import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {
  return (
    <header className="header">
      <nav className='navigation'>
        <ul className="navigation__list">
          <li>
            <h1 className="logo">
              <a href=""><img src="src/assets/static/logo.svg" alt="Logo" className="logo__image" /></a>
            </h1>
          </li>
          <div className='header__right space-x-8'>
            <li><a href="#home">Learning paths</a></li>
            <li><a href="#about">Challenges</a></li>
            <li><a href="#services">Solutions</a></li>
            <li><a href="#contact">Articles</a></li>
            <li><a href="#contact">Unlock pro</a></li>
            <li>
              <button className="button button__primary">
                Log in with Github
                <FontAwesomeIcon icon={['fab', 'github']} size="2xl" />
              </button>
            </li>
          </div>
        </ul>
      </nav>

    </header>





  );
}

export default Header;
