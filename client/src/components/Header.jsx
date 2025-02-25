import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/user';
import { showToast } from '../helpers/toast';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [dropdownState, setDropdownState] = useState({ menu: false, profile: false });
  const [studentProfile, setStudentProfile] = useState(null);

  const toggleDropdown = (key) => {
    setDropdownState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const fetchProfile = async () => {
    try {
      const profileData = await userService.getProfile();
      setStudentProfile({
        Name: profileData.user_name,
        Email: profileData.user_email,
        Password: profileData.user_password,
      });
      toggleDropdown('profile');
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setStudentProfile(null);
    setDropdownState({ menu: false, profile: false });
    navigate('/home');
  };

  const getNavClass = ({ isActive }) => (isActive ? "font-semibold underline text-blue-800" : "");

  const menuItems = [
    { path: "/home", label: "Home", protected: false },
    { path: "/booksessions", label: "Book Session", protected: true },
    { path: "/mysessions", label: "My Sessions", protected: true },
    { path: "/publishsessions", label: "Publish Sessions", protected: true }
  ];

  const profileMenuItems = [
    { path: "/studentprofile", label: "Student Profile" },
    { path: "/tutorprofile", label: "Tutor Profile" },
    { path: "/settings", label: "Settings" },
    { path: "/support", label: "Support" },
    { label: "Logout", action: handleLogout }
  ];

  return (
    <header className="border-b-2 border-gray-300 shadow-md">
      <nav className="wrapper flex items-center justify-between p-4">
        <div className="flex items-center gap-10">
          <div className="relative">
            <button className="cursor-pointer" onClick={() => toggleDropdown('menu')}>
              <FontAwesomeIcon icon={['fas', 'bars']} size="2x" />
            </button>
            {dropdownState.menu && (
              <div className="dropdown-container">
                <ul>
                  <li className="dropdown-item">Item 1</li>
                  <li className="dropdown-item">Item 2</li>
                  <li className="dropdown-item">Item 3</li>
                </ul>
              </div>
            )}
          </div>

          <h1>
            <NavLink to="/home">
              <img src="src/assets/static/logo-removebg.png" alt="Logo" className="w-16" />
            </NavLink>
          </h1>
        </div>

        <ul className="flex items-center gap-10">
          {menuItems.map(({ path, label, protected: isProtected }) => (
            <li key={path}>
              {isProtected && !isAuthenticated ? (
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
              <button className="cursor-pointer" onClick={fetchProfile}>
                <FontAwesomeIcon icon={['fas', 'circle-user']} size="2x" />
              </button>
              {dropdownState.profile && studentProfile && (
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
              <button className="cursor-pointer" onClick={() => toggleDropdown('profile')}>
                <FontAwesomeIcon icon={['fas', 'circle-user']} size="2x" />
              </button>
              {dropdownState.profile && (
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
