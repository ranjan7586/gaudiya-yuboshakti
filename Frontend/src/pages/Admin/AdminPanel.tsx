import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Search, Menu, X, Plus, Settings, Home, Users, Tag, Grid, FileText, ChevronDown, LogOut, Moon, ArrowLeft, ArrowRight } from 'lucide-react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import PostsContent from '../../components/Admin/PostsContent';
import CategoriesContent from '../../components/Admin/CategoriesContent';
import UsersContent from '../../components/Admin/UsersContent';
import AdminHeader from '../../components/Admin/AdminHeader';
export default function AdminPanel() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('posts');
    const [darkMode, setDarkMode] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');

    const renderContent = () => {
        switch (currentPage) {
            case 'posts':
                return <PostsContent />;
            case 'categories':
                return <CategoriesContent />;
            case 'users':
                return <UsersContent />;
            default:
                return <PostsContent />;
        }
    };

    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            {/* Sidebar */}
            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                toggleSidebar={toggleSidebar}
            />

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <AdminHeader darkMode={darkMode} currentPage={currentPage} currentUser={currentUser} />

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}