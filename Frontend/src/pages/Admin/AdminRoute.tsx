import React from 'react';
import axiosAuth from '../../config/axios_auth';
import { Outlet, useNavigate } from 'react-router-dom';

// type Props = {}

const AdminRoute = () => {
    const navigate: any = useNavigate();
    const [error, setError] = React.useState<any>(null);
    const backendUrl: string = import.meta.env.VITE_BACKEND_URL;
    const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null); // null means "not yet checked"

    const checkAdminStatus = async () => {
        try {
            const { data } = await axiosAuth.post(`${backendUrl}/api/v1/auth/role-check`);
            const isAdminUser = data.data === 'admin';
            if (!isAdminUser) {
                localStorage.removeItem('currentUser');
                navigate('/admin/login');
                return;
            }
            setIsAdmin(true);
        } catch (error) {
            setError(error);
            localStorage.removeItem('currentUser');
            navigate('/admin/login');
            return;
        }
    };

    React.useEffect(() => {
        checkAdminStatus();
    }, []);

    if (isAdmin === null) return <div>Checking admin access...</div>; // blocks render until check is done
    if (error) return <div>Error: {error.message || 'Access denied'}</div>;
    return <Outlet />;
};

export default AdminRoute;
