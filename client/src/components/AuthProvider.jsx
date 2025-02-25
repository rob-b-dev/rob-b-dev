import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../helpers/jwt';
import authService from '../services/authentication';
import { AuthContext } from '../hooks/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../helpers/toast'

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [hasTutorProfile, setHasTutorProfile] = useState(false)

    // Renders on every page load due to hierarchy in the main app
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await authService.verifyToken();
                handleAuth(response.jwt);
                setHasTutorProfile(!!response.has_tutor_profile) // Converts line to boolean
            } catch (error) {
                setIsAuthenticated(false);
                console.error(error.response?.data)
            }
        };
        checkAuthentication();
    });

    const login = async (data) => {
        try {
            const response = await authService.login(data);
            handleAuth(response.jwt);
            showToast('Login successful', 'success')
        } catch (error) {
            showToast(error.response?.data, 'error')
        }
    };

    const register = async (data) => {
        try {
            const response = await authService.register(data);
            handleAuth(response.jwt);
            showToast('Register successful', 'success')
        } catch (error) {
            showToast(error.response?.data, 'error')
        }
    };

    const logout = async () => {
        try {
            const response = await authService.logout();
            handleAuth(response.jwt); // Auth state changed due when access level of JWT is checked and recognised as PUBLIC
            showToast('Logout successful', 'success')
        } catch (error) {
            console.error('Logout failed:', error.response?.data);
        }
    };

    // Change auth state depending on JWT access level
    const handleAuth = async (jwt) => {
        setIsAuthenticated(isLoggedIn(jwt));
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, hasTutorProfile, login, logout, register }}>
            {children}
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ bottom: '60px' }}
            />
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
