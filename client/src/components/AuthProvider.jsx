import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../helpers/jwt';
import authService from '../services/authentication';
import { AuthContext } from '../hooks/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // On refresh
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await authService.verifyToken();
                handleAuth(response.jwt);
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
        } catch (error) {
            console.error('Login failed:', error.response?.data);
        }
    };

    const register = async (data) => {
        try {
            const response = await authService.register(data);
            handleAuth(response.jwt);
            showToast('Registration successful', 'success');
        } catch (error) {
            console.error('Registration failed:', error.response?.data);
            showToast(error.response?.data || 'Registration failed', 'error');
        }
    };

    const logout = async () => {
        try {
            const response = await authService.logout();
            handleAuth(response.jwt);
            showToast('Logged out', 'success')
        } catch (error) {
            console.error('Logout failed:', error.response?.data);
        }
    };

    const handleAuth = async (jwt) => {
        setIsAuthenticated(isLoggedIn(jwt));
    };

    const showToast = (message, type) => {
        const id = message; // use message as the toast id
        if (!toast.isActive(id)) {
            if (type === 'success') {
                toast.success(message, { toastId: id });
            } else {
                toast.error(message, { toastId: id });
            }
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
            {children}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover style={{ marginTop: '60px' }} />
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
