/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';


const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation()

    if (loading || isAdminLoading) {
        return (
            <div className="p-6">
                <Skeleton height={40} width={300} count={10} />
            </div>
        )
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/dashboard/userHome' state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;