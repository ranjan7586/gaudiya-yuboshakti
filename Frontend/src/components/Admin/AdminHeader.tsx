import { ChevronDown, Search } from 'lucide-react'
type Props = {
    currentUser: any;
    darkMode: boolean;
    currentPage: string;
}

const AdminHeader = ({ darkMode, currentPage, currentUser }: Props) => {
    return (
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
                        <img src={currentUser?.user?.profileImage} alt="User" className="w-8 h-8 rounded-full" />
                        <span>{currentUser?.user?.name}</span>
                        <ChevronDown size={16} />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader