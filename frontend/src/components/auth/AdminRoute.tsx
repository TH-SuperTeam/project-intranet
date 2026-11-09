
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AccessRole } from "../../types/AccessRole";

const AdminRoute = () => {
    const { user } = useAuth();

    if (user?.accessRole !== AccessRole.ADMIN) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
