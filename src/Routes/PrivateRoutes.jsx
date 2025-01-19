/* eslint-disable react/prop-types */
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="p-6">
                <Skeleton height={40} width={300} count={3} />
            </div>
        )
    }

    if (user) {
        return children;
    }


    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateRoutes;