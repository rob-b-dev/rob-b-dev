import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/user';
import { showToast } from '../helpers/toast';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme')); // Get the saved theme from local storage on page load to keep state

  // Apply the dark theme when 'theme' changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark'); // Add or remove the 'dark' class on <html>
    localStorage.setItem('theme', theme); // Save the theme to local storage
  }, [theme]);

  // Switch between light and dark mode
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Toggle the profile dropdown and fetch profile data
  const toggleDropdown = async () => {
    setDropdownOpen((prev) => !prev);
    try {
      const profileData = await userService.getProfile();
      setStudentProfile({
        Name: profileData.user_name,
        Email: profileData.user_email,
        Password: profileData.user_password,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Handle user logout
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setStudentProfile(null);
    setDropdownOpen(false);
    navigate('/home');
  };

  // IsActive class for active tabs selected
  const getNavClass = ({ isActive }) => (isActive ? "font-semibold underline text-blue-400" : "");

  // Menu items and props for mapping to reduce code
  const menuItems = [
    { path: "/home", label: "Home" },
    { path: "/booksessions", label: "Book Session" },
    { path: "/mysessions", label: "My Sessions" },
    { path: "/publishsessions", label: "Publish Sessions" }
  ];

  // profike dropdown items and props for mapping to reduce code
  const profileMenuItems = [
    { path: "/studentprofile", label: "Student Profile" },
    { path: "/tutorprofile", label: "Tutor Profile" },
    { path: "/support", label: "Support" },
    { label: "Logout", action: handleLogout } // Action to handle logout
  ];

  return (
    <header className="fixed top-0 left-0 w-full border-b-2 border-gray-300 shadow-md z-50">
      <nav className="wrapper flex items-center justify-between p-4">
        <div className="flex items-center gap-10">
          <h1>
            <NavLink to="/home">
              <img src="src/assets/static/logo-removebg.png" alt="Logo" className="w-16" />
            </NavLink>
          </h1>
          <div className="relative">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors cursor-pointer ${theme === 'light' ? 'bg-[#DCDCDC] text-yellow-500' : 'text-blue-400'}`}
            >
              {/* If light toggle sun, else toggle moon */}
              <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} className="text-xl" />
            </button>
          </div>


        </div>

        <ul className="flex items-center gap-10">
          {menuItems.map(({ path, label }) => (
            <li key={path}>
              {!isAuthenticated && path !== "/home" ? (
                <button className="cursor-pointer" onClick={() => {
                  showToast('Login needed to access', 'error');
                  navigate('/login');
                }}>{label}</button>
              ) : (
                // NavLink to display the label and path to navigate to through mapping
                <NavLink className={getNavClass} to={path}>{label}</NavLink>
              )}
            </li>
          ))}

          {isAuthenticated ? (
            <div className="relative">
              <button className="cursor-pointer" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </button>
              {dropdownOpen && studentProfile && (
                <div className="dropdown-container">
                  <ul>
                    {profileMenuItems.map(({ path, label, action }) => (
                      <li key={label} className="dropdown-item">
                        {action ? (
                          <button className="cursor-pointer" onClick={action}>{label}</button>
                        ) : (
                          <NavLink className={getNavClass} to={path}>{label}</NavLink>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button className="cursor-pointer" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </button>
              {dropdownOpen && (
                <div className="dropdown-container">
                  <ul>
                    <li className="dropdown-item">
                      <NavLink className={getNavClass} to="/login">Log in</NavLink>
                    </li>
                    <li className="dropdown-item">
                      <NavLink className={getNavClass} to="/register">Register</NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;