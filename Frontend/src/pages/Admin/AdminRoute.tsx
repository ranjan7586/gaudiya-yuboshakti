import React from 'react';
import axiosAuth from '../../config/axios_auth';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminHeader from '../../components/Admin/AdminHeader';

// type Props = {}

const AdminRoute = () => {
    const navigate: any = useNavigate();
    const [error, setError] = React.useState<any>(null);
    const backendUrl: string = import.meta.env.VITE_BACKEND_URL;
    const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null); // null means "not yet checked"
    
    const [darkMode, setDarkMode] = React.useState(true);
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState('dashboard');

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


    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                toggleSidebar={toggleSidebar}
            />
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <AdminHeader darkMode={darkMode} currentPage={currentPage} currentUser={currentUser} />
                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminRoute;
