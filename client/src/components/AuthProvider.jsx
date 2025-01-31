import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../helpers/jwt';
import authService from '../services/authentication';
import { AuthContext } from '../hooks/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../helpers/showToast'

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // Renders on every page load due to hierarchy in the main app
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await authService.verifyToken();
                handleAuth(response.jwt);
                // This block executes when the user tampers with a JWT - this is checked in /verify which calls the authorization middleware
            } catch (error) {
                setIsAuthenticated(false); // User not authorized if JWT tampered with
                console.error(error.response?.data) // Message from middleware logged in console for a few seconds before page reload
            }
        };
        checkAuthentication();
    }, []);

    const login = async (data) => {
        try {
            // Executes on login submit if data is valid
            const response = await authService.login(data);
            handleAuth(response.jwt); // Gathers private JWT when logged in 
            showToast('Login successful', 'success')
            // This block executes when the validation middleware of /login returns an error
        } catch (error) {
            showToast(error.response?.data, 'error')
        }
    };

    const register = async (data) => {
        try {
            // Executes on register submit if data is valid
            const response = await authService.register(data);
            handleAuth(response.jwt); // Gathers private JWT when logged in 
            showToast('Register successful', 'success')
        } catch (error) {
            // This block executes when the validation middleware of /login returns an error
            showToast(error.response?.data, 'error')
        }
    };

    const logout = async () => {
        try {
            const response = await authService.logout(); // User handed public JWT on logout
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
