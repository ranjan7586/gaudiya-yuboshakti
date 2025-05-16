import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Menu, X, Plus, Settings, Home, Users, Tag, Grid, FileText, ChevronDown, LogOut, Moon, ArrowLeft, ArrowRight } from 'lucide-react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import PostsContent from '../../components/Admin/PostsContent';
import CategoriesContent from '../../components/Admin/CategoriesContent';
import UsersContent from '../../components/Admin/UsersContent';
export default function AdminPanel() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('posts');
    const [darkMode, setDarkMode] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

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
                <header className={`${darkMode ? 'bg-gray-800' : 'bg-white border-b'} p-4 flex justify-between items-center`}>
                    <div className="flex items-center">
                        <h2 className="text-xl font-semibold capitalize">{currentPage}</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className={`relative rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 flex items-center`}>
                            <Search size={18} className="mr-2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className={`outline-none w-40 bg-transparent`}
                            />
                        </div>
                        <div className="relative">
                            <button className="flex items-center space-x-2">
                                <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full" />
                                <span>Admin</span>
                                <ChevronDown size={16} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}