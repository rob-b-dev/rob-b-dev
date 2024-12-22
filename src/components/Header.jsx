import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className='header-left'>
        <div className="logo">
          <img src="src/assets/static/logo.svg" alt="Logo" />
          <span className="logo-text">
            <span className="spelled-wrong">frontend</span> mentor
          </span>
        </div>
      </div>

      <div className="header-right">
        <nav className="navigation">
          <ul>
            <li><a href="#home">Learning paths</a></li>
            <li><a href="#about">Challenges</a></li>
            <li><a href="#services">Solutions</a></li>
            <li><a href="#contact">Articles</a></li>
            <li><a href="#contact">Unlock pro</a></li>
          </ul>
        </nav>

        <button className="cta-button">
          Log in with Github
          <div>
            <img src="src/assets/static/github.jpg" alt="Github" />
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
