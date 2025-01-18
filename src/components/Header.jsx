import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLoginClick = () => {
    // Toggles on click between login and register
    setShowLoginForm((prev) => !prev)
    console.log(showLoginForm)
    setShowRegisterForm(false); // Hide register form when showing login form
  }

  const handleRegisterClick = () => {
    setShowRegisterForm((prev) => !prev)
    setShowLoginForm(false)
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();

      if (response.ok) {
        alert('Login successful');
      } else {
        alert(data.message || 'Error during login');
      }

    } catch (error) {
      alert('Server Error');
      console.error(error.message);
    }
  }


  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const registerData = { name, email, password };
    try {
      const response = await fetch("http://localhost:5001/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData)
      });
      const data = await response.json();

      if (response.ok) {
        alert('Login successful');
      } else {
        alert(data.message || 'Error during login');
      }

    } catch (error) {
      alert('Server Error');
      console.error(error.message);
    }
  }

  return (
    <header className="header">
      <nav className="navigation">
        <ul className="navigation__list">
          <li>
            <h1 className="logo">
              <a href="">
                <img src="src/assets/static/logo.svg" alt="Logo" className="logo__image" />
              </a>
            </h1>
          </li>
          <div className="header__right space-x-8">
            <li><a href="#home">Learning paths</a></li>
            <li><a href="#about">Challenges</a></li>
            <li><a href="#services">Solutions</a></li>
            <li><a href="#contact">Articles</a></li>
            <li><a href="#contact">Unlock pro</a></li>
            <li>
              <button
                id="login"
                className="button button__primary"
                onClick={handleLoginClick}
              >
                <span>Log in with Email</span>
                <FontAwesomeIcon icon={['fas', 'envelope']} size="2xl" />
              </button>
            </li>
          </div>
        </ul>
      </nav>


    </header>
  );
}

export default Header;
