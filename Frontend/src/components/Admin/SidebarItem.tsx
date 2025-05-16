import React from 'react'

interface SidebarItemProps {
    label: string;
    isOpen: boolean;
    darkMode: boolean;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isOpen, onClick, isActive, darkMode }: SidebarItemProps) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-full p-4 ${isActive ? (darkMode ? 'bg-gray-800' : 'bg-gray-200') : 'hover:bg-gray-700'} ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-colors`}
        >
            <div className={`${isActive ? (darkMode ? 'text-white' : 'text-black') : (darkMode ? 'text-gray-300' : 'text-gray-600')}`}>
                {icon}
            </div>
            {isOpen && <span className={`ml-4 ${isActive ? 'font-semibold' : ''}`}>{label}</span>}
        </button>
    );
}

export default SidebarItem