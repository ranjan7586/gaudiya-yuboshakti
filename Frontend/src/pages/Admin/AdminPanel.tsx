import { useState } from 'react';
import { Search, Menu, X, Plus, Settings, Home, Edit3, Users, Tag, Grid, FileText, ChevronDown, LogOut, Moon, ArrowLeft, ArrowRight } from 'lucide-react';

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

function SidebarItem({ icon, label, isOpen, onClick, isActive, darkMode }) {
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

function PostsContent() {
    const posts = [
        { id: 1, title: 'Getting Started with React', author: 'John Doe', category: 'Development', status: 'Published', date: 'Apr 10, 2025' },
        { id: 2, title: 'Mastering TypeScript', author: 'Jane Smith', category: 'Development', status: 'Draft', date: 'Apr 15, 2025' },
        { id: 3, title: 'Tailwind CSS Tips and Tricks', author: 'John Doe', category: 'Design', status: 'Published', date: 'Apr 12, 2025' },
        { id: 4, title: 'Building Modern Web Applications', author: 'Lisa Jones', category: 'Development', status: 'Review', date: 'Apr 18, 2025' },
        { id: 5, title: 'SEO Best Practices for 2025', author: 'Mark Wilson', category: 'Marketing', status: 'Published', date: 'Apr 5, 2025' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Posts</h1>
                    <p className="text-gray-500">Manage your blog posts</p>
                </div>
                <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    <Plus size={18} />
                    <span>Add New</span>
                </button>
            </div>

            <div className="bg-gray-800 bg-opacity-5 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                    <div className="col-span-5">Title</div>
                    <div className="col-span-2">Author</div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-2">Date</div>
                </div>

                {posts.map(post => (
                    <div key={post.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="col-span-5 flex items-center">
                            <div className="flex-1">
                                <div className="font-medium">{post.title}</div>
                                <div className="flex space-x-3 mt-1">
                                    <button className="text-blue-600 text-sm hover:underline">Edit</button>
                                    <button className="text-red-600 text-sm hover:underline">Delete</button>
                                    <button className="text-gray-600 text-sm hover:underline">View</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">{post.author}</div>
                        <div className="col-span-2">{post.category}</div>
                        <div className="col-span-1">
                            <span className={`px-2 py-1 rounded-full text-xs ${post.status === 'Published' ? 'bg-green-100 text-green-800' :
                                    post.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                                        'bg-yellow-100 text-yellow-800'
                                }`}>
                                {post.status}
                            </span>
                        </div>
                        <div className="col-span-2">{post.date}</div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                    Showing 1-5 of 5 posts
                </div>
                <div className="flex space-x-2">
                    <button className="p-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ArrowLeft size={16} />
                    </button>
                    <button className="p-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function CategoriesContent() {
    const categories = [
        { id: 1, name: 'Development', count: 15, slug: 'development', description: 'Programming tutorials and guides' },
        { id: 2, name: 'Design', count: 8, slug: 'design', description: 'UI/UX and graphic design content' },
        { id: 3, name: 'Marketing', count: 12, slug: 'marketing', description: 'Digital marketing strategies' },
        { id: 4, name: 'Business', count: 6, slug: 'business', description: 'Business tips and advice' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <p className="text-gray-500">Manage your blog categories</p>
                </div>
                <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    <Plus size={18} />
                    <span>Add New</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Add Category Form */}
                <div className="bg-gray-800 bg-opacity-5 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input type="text" className="w-full p-2 border rounded bg-transparent" placeholder="Category name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <input type="text" className="w-full p-2 border rounded bg-transparent" placeholder="category-slug" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea className="w-full p-2 border rounded bg-transparent" rows={3} placeholder="Description..."></textarea>
                        </div>
                        <button className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">Add Category</button>
                    </div>
                </div>

                {/* Categories List */}
                <div className="md:col-span-3">
                    <div className="bg-gray-800 bg-opacity-5 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                            <div className="col-span-3">Name</div>
                            <div className="col-span-3">Slug</div>
                            <div className="col-span-4">Description</div>
                            <div className="col-span-2">Count</div>
                        </div>

                        {categories.map(category => (
                            <div key={category.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                <div className="col-span-3">
                                    <div className="font-medium">{category.name}</div>
                                    <div className="flex space-x-3 mt-1">
                                        <button className="text-blue-600 text-sm hover:underline">Edit</button>
                                        <button className="text-red-600 text-sm hover:underline">Delete</button>
                                    </div>
                                </div>
                                <div className="col-span-3">{category.slug}</div>
                                <div className="col-span-4">{category.description}</div>
                                <div className="col-span-2">{category.count}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function UsersContent() {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Administrator', posts: 12, joinDate: 'Jan 15, 2025' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', posts: 8, joinDate: 'Feb 20, 2025' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Author', posts: 5, joinDate: 'Mar 10, 2025' },
        { id: 4, name: 'Lisa Brown', email: 'lisa@example.com', role: 'Contributor', posts: 3, joinDate: 'Apr 5, 2025' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Users</h1>
                    <p className="text-gray-500">Manage your blog users and roles</p>
                </div>
                <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    <Plus size={18} />
                    <span>Add User</span>
                </button>
            </div>

            <div className="bg-gray-800 bg-opacity-5 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Posts</div>
                    <div className="col-span-2">Join Date</div>
                </div>

                {users.map(user => (
                    <div key={user.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="col-span-3">
                            <div className="flex items-center">
                                <img src={`/api/placeholder/32/32`} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="flex space-x-3 mt-1">
                                        <button className="text-blue-600 text-sm hover:underline">Edit</button>
                                        <button className="text-red-600 text-sm hover:underline">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">{user.email}</div>
                        <div className="col-span-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'Administrator' ? 'bg-blue-100 text-blue-800' :
                                    user.role === 'Editor' ? 'bg-green-100 text-green-800' :
                                        user.role === 'Author' ? 'bg-purple-100 text-purple-800' :
                                            'bg-gray-100 text-gray-800'
                                }`}>
                                {user.role}
                            </span>
                        </div>
                        <div className="col-span-2">{user.posts}</div>
                        <div className="col-span-2">{user.joinDate}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}