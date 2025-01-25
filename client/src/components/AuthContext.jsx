import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import { isLoggedIn } from '../helpers/jwt';
import authService from '../services/authentication';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await authService.verifyToken();
                handleAuth(response.jwt);
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    const login = async (data) => {
        try {
            const response = await authService.login(data);
            handleAuth(response.jwt);
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    const register = async (data) => {
        try {
            const response = await authService.register(data);
            handleAuth(response.jwt);
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    const logout = async () => {
        try {
            const response = await authService.logout();
            handleAuth(response.jwt);
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    const handleAuth = async (jwt) => {
        setIsAuthenticated(isLoggedIn(jwt));
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validate that 'children' is a React node and is required
};
