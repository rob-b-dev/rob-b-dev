import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faUserCircle, faUniversalAccess } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/user';
import { showToast } from '../helpers/toast';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [accessibilityDropdownOpen, setAccessibilityDropdownOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showMagnifier, setShowMagnifier] = useState(false);

  const toggleMagnify = () => setShowMagnifier((prev) => !prev);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const toggleProfileDropdown = async () => {
    setProfileDropdownOpen((prev) => !prev);
    setAccessibilityDropdownOpen(false);
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

  const toggleAccessibilityDropdown = () => {
    setAccessibilityDropdownOpen((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setStudentProfile(null);
    setProfileDropdownOpen(false);
    navigate('/home');
  };

  const getNavClass = ({ isActive }) => (isActive ? "font-semibold underline text-blue-400" : "");

  const menuItems = [
    { path: "/home", label: "Home" },
    { path: "/booksessions", label: "Book Session" },
    { path: "/mysessions", label: "My Sessions" },
    { path: "/publishsessions", label: "Publish Sessions" }
  ];

  const profileMenuItems = [
    { path: "/studentprofile", label: "Student Profile" },
    { path: "/tutorprofile", label: "Tutor Profile" },
    { path: "/support", label: "Support" },
    { label: "Logout", action: handleLogout }
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
          <div className="flex gap-5">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors cursor-pointer ${theme === 'light' ? 'bg-[#DCDCDC] text-yellow-500' : 'text-blue-400'}`}
            >
              <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} className="text-xl" />
            </button>
            <div className="relative">
              <button onClick={toggleAccessibilityDropdown} className="p-2 rounded-full">
                <FontAwesomeIcon icon={faUniversalAccess} className="text-xl" />
              </button>
              {accessibilityDropdownOpen && (
                <div className="dropdown-container">
                  <ul>
                    <li className="dropdown-item">
                      <button className='cursor-pointer' onClick={toggleMagnify}>
                        {showMagnifier ? 'Disable magnifier' : 'Enable magnifier'}
                      </button>
                    </li>
                    <li className="dropdown-item">
                      <button className='cursor-pointer'>
                        Change language
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
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
                <NavLink className={getNavClass} to={path}>{label}</NavLink>
              )}
            </li>
          ))}

          {isAuthenticated ? (
            <div className="relative">
              <button className="cursor-pointer" onClick={toggleProfileDropdown}>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </button>
              {profileDropdownOpen && studentProfile && (
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
              <button className="cursor-pointer" onClick={toggleProfileDropdown}>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </button>
              {profileDropdownOpen && (
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
