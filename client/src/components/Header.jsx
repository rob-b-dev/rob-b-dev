import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/user';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menuDropdown, setMenuDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);

  const toggleDropdown = (setter) => setter(prev => !prev);

  const fetchProfile = async () => {
    try {
      const profileData = await userService.getProfile();
      setStudentProfile({
        Name: profileData.user_name,
        Email: profileData.user_email,
        Password: profileData.user_password,
      });
      toggleDropdown(setProfileDropdown);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setStudentProfile(null);
    setProfileDropdown(false);
    navigate('/home');
  };

  const getNavClass = ({ isActive }) => (isActive ? "font-semibold underline" : "");

  // Menu Configuration
  const menuItems = [
    { path: "/home", label: "Home" },
    { path: "/booksessions", label: "Book Session" },
    { path: "/mysessions", label: "My Sessions" },
    { path: "/publishsessions", label: "Publish Sessions" }
  ];

  const profileMenuItems = [
    { path: "/studentprofile", label: "Student Profile" },
    { path: "/tutorprofile", label: "Tutor Profile" },
    { path: "/settings", label: "Settings" },
    { path: "/support", label: "Support" }
  ];

  return (
    <header className="border-b-2 border-gray-300 shadow-md">
      <nav className="wrapper flex items-center justify-between p-4">
        <div className="relative">
          <button className="cursor-pointer" onClick={() => toggleDropdown(setMenuDropdown)}>
            <FontAwesomeIcon icon={['fas', 'bars']} size="2x" />
          </button>
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

        <h1>
          <NavLink to="/home">
            <img src="src/assets/static/logo-removebg.png" alt="Logo" className="w-16" />
          </NavLink>
        </h1>

        <ul className="flex items-center gap-6">
          {menuItems.map(({ path, label }) => (
            <li key={path}>
              <NavLink className={getNavClass} to={path}>{label}</NavLink>
            </li>
          ))}

          {isAuthenticated ? (
            <div className="relative">
              <button className="cursor-pointer" onClick={fetchProfile}>
                <FontAwesomeIcon icon={['fas', 'circle-user']} size="2x" />
              </button>
              {profileDropdown && studentProfile && (
                <div className="dropdown-container">
                  <ul>
                    {profileMenuItems.map(({ path, label }) => (
                      <li key={path}>
                        <NavLink className={getNavClass} to={path}>{label}</NavLink>
                      </li>
                    ))}
                    <li className="dropdown-item">
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <li><NavLink className={getNavClass} to="/login">Log in</NavLink></li>
              <li><NavLink className={getNavClass} to="/register">New? Sign up</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
