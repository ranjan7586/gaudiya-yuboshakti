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
            const response = await axiosAuth.get(`${backendUrl}/api/v1/admin/check`);
            setIsAdmin(response.data.isAdmin);
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