import React from 'react'
import { Search, Menu, X, Plus, Settings, Home, Users, Tag, Grid, FileText, ChevronDown, LogOut, Moon, ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {}

const UsersContent = (props: Props) => {
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
    )
}

export default UsersContent