import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/user';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menu, setMenu] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const handleMenuClick = () => setMenu(prev => !prev);

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleProfileClick = async () => {
    try {
      const profileData = await userService.getProfile();
      setUserProfile({
        Name: profileData.user_name,
        Email: profileData.user_email,
        Password: profileData.user_password,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    setIsProfileVisible(prev => !prev);
  };

  // Log out user
  const handleLogoutClick = (e) => {
    e.preventDefault();
    logout();
    setUserProfile(null);
    setIsProfileVisible(false);
    navigate('/');
  };

  // Navigate to register page
  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  // Navigate to profile page with user details
  const handleProfileLinkClick = () => {
    navigate('/userprofile', { state: { user: userProfile } });
  };

  // Conditional rendering for authentication buttons
  const authButtonsRight = isAuthenticated ? (
    <div className='relative'>
      <a onClick={handleProfileClick}>
        <FontAwesomeIcon icon={['fas', 'user']} size="3x" />
      </a>
      {isProfileVisible && userProfile && (
        <div className="dropdown-container">
          <ul>
            <li className='dropdown-item'>
              <a onClick={handleProfileLinkClick}>Profile</a>
            </li>
            <li className='dropdown-item'><a href="/settings">Settings</a></li>
            <li className='dropdown-item'><a href="/support">Support</a></li>
            <li className='dropdown-item'>
              <a onClick={handleLogoutClick}>Logout</a>
            </li>

          </ul>
        </div>
      )}
    </div>
  ) : (
    <>
      <li><a className='hover' onClick={handleLoginClick}>Log in</a></li>
      <li><a className='hover' onClick={handleRegisterClick}>New? Sign up</a></li>
    </>
  );

  // Left side auth buttons for mobile menu
  const authButtonsLeft = (
    <div className="relative">
      <a onClick={handleMenuClick}><FontAwesomeIcon icon={['fas', 'bars']} size="3x" /></a>
      {menu && (
        <div className="dropdown-container">
          <ul>
            <li className="dropdown-item">Item 1</li>
            <li className="dropdown-item">Item 2</li>
            <li className="dropdown-item">Item 3</li>
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <header className="header">
      <nav className="wrapper">
        <ul className="flex">
          <div className="header__left">
            {authButtonsLeft}
            <li>
              <h1 className="w-16 m-w-full">
                <a href="/">
                  <img src="src/assets/static/logo-removebg.png" alt="Logo" />
                </a>
              </h1>
            </li>
          </div>
          <div className="header__right">
            <li><a className='hover' href="/">Home</a></li>
            <li><a className='hover' href="/favourites">Favourites</a></li>
            {authButtonsRight}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
