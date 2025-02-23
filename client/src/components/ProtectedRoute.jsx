import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";


const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated === null || isAuthenticated === undefined) {
        return <div>Loading...</div>; // Prevents unauthorized pages from briefly rendering
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
