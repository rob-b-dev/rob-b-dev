import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../helpers/jwt';
import authService from '../services/authentication';
import { AuthContext } from '../hooks/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // Renders on every page load due to hierarchy in the main app
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await authService.verifyToken();
                const access_level = handleAuth(response.jwt);
                // Gathers access level from 
                if (access_level === 'PRIVATE') {
                    showToast('User tampered with token', 'error')
                }
            } catch (error) {
                setIsAuthenticated(false);
                console.error(error.message)
            }
        };

        checkAuthentication();
    }, []);

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
            handleAuth(response.jwt);
            showToast('Logged out successful', 'success')
        } catch (error) {
            console.error('Logout failed:', error.response?.data);
        }
    };

    const handleAuth = async (jwt) => {
        const { isPrivate, accessLevel } = isLoggedIn(jwt);
        setIsAuthenticated(isPrivate);
        return accessLevel
    };

    const showToast = (message, type) => {
        if (!toast.isActive(message)) {
            toast[type](message, { toastId: message });
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
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
