import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLoginClick = () => {
    setShowLoginForm((prev) => !prev);
    setShowRegisterForm(false); // Hide register form when showing login form
  };

  const handleRegisterClick = () => {
    setShowRegisterForm((prev) => !prev);
    setShowLoginForm(false); // Hide login form when showing register form
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful');
      } else {
        alert(data.message || 'Error during login');
      }
    } catch (error) {
      alert('Server error');
      console.error(error);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    const registerData = { name, email, password };

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful');
        setShowLoginForm(true); // Automatically show login form after successful registration
        setShowRegisterForm(false);
      } else {
        alert(data.message || 'Error during registration');
      }
    } catch (error) {
      alert('Server error');
      console.error(error);
    }
  };

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

      {/* Login Form */}
      {showLoginForm && (
        <div className="login-form__container">
          <form className="card w-30 relative flex flex-col justify-center space-y-4" onSubmit={handleSubmitLogin}>
            <button
              type="button"
              className="back-button text-sm text-grey"
              onClick={() => setShowLoginForm(false)}
            >
              &larr; Back
            </button>

            <h2 className="text-center header-sm">Login</h2>
            <label className="bold" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <label className="bold" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <div className="space-y-2 flex flex-col items-center">
              <button type="submit" className="button button__primary w-50">Submit</button>
              <button type="button" className="button button__secondary w-50">Forgot Password?</button>
              <button
                type="button"
                className="register-link text-grey"
                onClick={handleRegisterClick}
              >
                Don't have an account? Register
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Register Form */}
      {showRegisterForm && (
        <div className="login-form__container">
          <form className="card w-30 relative flex flex-col justify-center space-y-4" onSubmit={handleSubmitRegister}>
            <button
              type="button"
              className="back-button text-sm text-grey"
              onClick={() => setShowRegisterForm(false)}
            >
              &larr; Back
            </button>

            <h2 className="text-center header-sm">Register</h2>
            <label className="bold" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
            <label className="bold" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <label className="bold" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <div className="space-y-2 flex flex-col items-center">
              <button type="submit" className="button button__primary w-50">Submit</button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}

export default Header;
