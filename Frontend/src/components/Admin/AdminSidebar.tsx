import React from 'react'
import SidebarItem from './SidebarItem';
import { Search, Menu, X, Plus, Settings, Home, Users, Tag, Grid, FileText, ChevronDown, LogOut, Moon, ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
    darkMode: boolean;
    currentPage: string;
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, currentPage, setCurrentPage, darkMode, setDarkMode, toggleSidebar }: Props) => {
    return (
        <div>
            <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ${darkMode ? 'bg-black' : 'bg-gray-100'} h-full flex flex-col`}>
                <div className="p-4 flex justify-between items-center">
                    {sidebarOpen && <h1 className="text-xl font-bold">Blog Admin</h1>}
                    <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-700">
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 mt-6">
                    <SidebarItem
                        icon={<Home size={20} />}
                        label="Dashboard"
                        isOpen={sidebarOpen}
                        onClick={() => setCurrentPage('dashboard')}
                        isActive={currentPage === 'dashboard'}
                        darkMode={darkMode}
                    />
                    <SidebarItem
                        icon={<FileText size={20} />}
                        label="Posts"
                        isOpen={sidebarOpen}
                        onClick={() => setCurrentPage('posts')}
                        isActive={currentPage === 'posts'}
                        darkMode={darkMode}
                    />
                    <SidebarItem
                        icon={<Tag size={20} />}
                        label="Categories"
                        isOpen={sidebarOpen}
                        onClick={() => setCurrentPage('categories')}
                        isActive={currentPage === 'categories'}
                        darkMode={darkMode}
                    />
                    <SidebarItem
                        icon={<Grid size={20} />}
                        label="Post Types"
                        isOpen={sidebarOpen}
                        onClick={() => setCurrentPage('types')}
                        isActive={currentPage === 'types'}
                        darkMode={darkMode}
                    />
                    <SidebarItem
                        icon={<Users size={20} />}
                        label="Users"
                        isOpen={sidebarOpen}
                        onClick={() => setCurrentPage('users')}
                        isActive={currentPage === 'users'}
                        darkMode={darkMode}
                    />
                    <SidebarItem
                        icon={<Settings size={20} />}
                        label="Settings"
                        isOpen={sidebarOpen}
                        onClick={() => setCurrentPage('settings')}
                        isActive={currentPage === 'settings'}
                        darkMode={darkMode}
                    />
                </nav>

                <div className="p-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`flex items-center space-x-2 p-2 w-full rounded ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                    >
                        <Moon size={20} />
                        {sidebarOpen && <span>Toggle Theme</span>}
                    </button>
                    <button className={`flex items-center space-x-2 p-2 w-full rounded mt-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                        <LogOut size={20} />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default AdminSidebar