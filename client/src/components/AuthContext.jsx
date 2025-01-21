// Context object created for authorizing user through passed token from server

import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(); // Create a context object to store data from the provider function

// Custom hook which simplifies accessing the authContext object - used when importing
export const useAuth = () => {
    // Returns context as useAuth (including the provider methods) to import into a component and use
    return useContext(AuthContext);
};

// The children prop represents any component wrapped inside the AuthProvider. These components can then access the 'useAuth' hook to utilize the context provided by AuthProvider.
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for token in cookies on app load or refresh
        const token = Cookies.get('authToken');
        if (token) {
            setIsAuthenticated(true); // Set authentication status based on token presence
        }
    }, []);

    const login = (token) => {
        // Places token in localStorage on login state
        Cookies.set('authToken', token, { expires: 7 });
        setIsAuthenticated(true); // Set user as authenticated
    };

    const logout = () => {
        // Removes token from cookies on logout state
        Cookies.remove('authToken');
        setIsAuthenticated(false); // Remove authenticated state
    };

    // Debugging - updates on authentication update
    useEffect(() => {
        console.log("Authentication status:", isAuthenticated);
    }, [isAuthenticated]);

    return (
        // Returns the AuthContext object alongside provider - provides the state of authentication as well as the login and logout functions
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}> { /* Props passed to be destructured when imported */}
            {children} { /* Children represent the wrapped components when importing and referencing provider methods */}
        </AuthContext.Provider>
    );
};
