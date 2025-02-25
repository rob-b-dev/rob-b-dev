// This route protects sensitive data depending on the users authenticated state through url manipulation

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";


const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);

    // Set loading state for long API calls
    if (isAuthenticated === null || isAuthenticated === undefined) {
        return <div>Loading...</div>; // Prevents unauthorized pages from briefly rendering
    }

    // If authenticated, return the outlet (page wanting to navigate to), else navigate to login as a protected route is trying to be accessed with a public JWT
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Exports bool for protected route access
export default ProtectedRoute;
