import React from 'react';
import { Outlet } from 'react-router-dom';
import axiosAuth from '../../config/axios_auth';

type Props = {}

const AdminRoute = (props: Props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [error, setError] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const checkAdminStatus = async () => {
        try {
            const { data } = await axiosAuth.post(`${backendUrl}/api/v1/auth/role-check`);
            console.log(data.data)
            // if (data.data !== 'admin') window.location.href = '/';
            setIsAdmin(data.data === 'admin');
        } catch (error) {
            setError(error);
        }
    }
    React.useEffect(() => {
        checkAdminStatus();
    }, []);
    return (
        <><Outlet /></>
    )
}

export default AdminRoute