import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/user';
import { showToast } from '../helpers/toast';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menuDropdown, setMenuDropdown] = useState(false); // Toggle menu dropdown
  const [studentProfile, setStudentProfile] = useState(null); // Set state to track profile data
  const [profileIcon, setProfileIcon] = useState(false); // Toggle profile icon state and render conditionally depending on auth state

  const handleMenuClick = () => setMenuDropdown(prev => !prev); // Set menu dropdown when clicked. Menu is always here but the toggle state for the dropdown is changed on click

  // When profile icon is pressed, user profile data is set from backend call retrieving profile data
  const handleProfileIconClick = async () => {
    try {
      const profileData = await userService.getProfile();
      setStudentProfile({
        Name: profileData.user_name,
        Email: profileData.user_email,
        Password: profileData.user_password,
      });
      // If any error fetching profile data, log it
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    // When code block is executed, toggle profile icon to true to display it on conditional render
    setProfileIcon(prev => !prev);

  };

  // Log out user
  const handleLogoutClick = (e) => {
    e.preventDefault();
    logout();
    setStudentProfile(null); // Delete profile data as user is now unauthorized
    setProfileIcon(prev => !prev); // Toggle profile icon state back to false
    navigate('/home');
  };

  // Navigate to profile page with user details
  const handleStudentProfileLinkClick = () => {
    navigate('/studentprofile');
  };

  const handleTutorProfileLinkClick = () => {
    navigate('/tutorprofile');
  };

  const handleSessionNavigation = (path) => {
    if (!isAuthenticated) {
      navigate('/login');
      showToast('Login needed to access', 'error')
    } else {
      navigate(path);
    }
  };

  // Conditional rendering for authentication buttons
  const authButtonsRight = isAuthenticated ? (
    <div className='relative'>
      <a className='cursor-pointer' onClick={handleProfileIconClick}>
        <FontAwesomeIcon icon={['fas', 'circle-user']} size="3x" />
      </a>
      {profileIcon && studentProfile && (
        <div className="dropdown-container">
          <ul>
            <li className='dropdown-item'>
              <button className='cursor-pointer' onClick={handleStudentProfileLinkClick}>Student Profile</button>
            </li>
            <li className='dropdown-item'>
              <button className='cursor-pointer' onClick={handleTutorProfileLinkClick}>Tutor Profile</button>
            </li>
            <li className='dropdown-item'><a href="/settings">Settings</a></li>
            <li className='dropdown-item'><a href="/support">Support</a></li>
            <li className='dropdown-item'>
              <button className='cursor-pointer' onClick={handleLogoutClick}>Logout</button>
            </li>

          </ul>
        </div>
      )}
    </div>
  ) : (
    <>
      <li><a className='hover' href='/login'>Log in</a></li>
      <li><a className='hover' href='/register'>New? Sign up</a></li>
    </>
  );

  // Left side auth buttons for mobile menu
  const authButtonsLeft = (
    <div className="relative">
      <button className='cursor-pointer' onClick={handleMenuClick}><FontAwesomeIcon icon={['fas', 'bars']} size="3x" /></button>
      {menuDropdown && (
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
      <nav className="wrapper ">
        <ul className="flex">
          <div className="header__left">
            {authButtonsLeft}
            <li>
              <h1 className="w-16 m-w-full">
                <a href="/home">
                  <img src="src/assets/static/logo-removebg.png" alt="Logo" />
                </a>
              </h1>
            </li>
          </div>
          <div className="header__right">
            <li><a className='hover' href="/home">Home</a></li>
            <li><button className="hover" onClick={() => handleSessionNavigation('/booksessions')}>Book Session</button></li>
            <li><button className="hover" onClick={() => handleSessionNavigation('/mysessions')}>My Sessions</button></li>
            <li><button className="hover" onClick={() => handleSessionNavigation('/publishsessions')}>Publish Sessions</button></li>
            {authButtonsRight}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
