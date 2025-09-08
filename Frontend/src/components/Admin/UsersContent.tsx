import { Plus } from 'lucide-react';
import { setUsers } from '../../contexts/UserContext';
import { useEffect, useState } from 'react';
import CreateUser from './CreateUser';

const UsersContent = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { users, refetchUsers } = setUsers();

    const handleCreateUser = () => {
        // After successful user creation, refresh the list
        refetchUsers();
        setIsFormOpen(false);
    };

    useEffect(() => {
        document.body.style.overflow = isFormOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isFormOpen]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Users</h1>
                    <p className="text-gray-500">Manage your blog users and roles</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    <Plus size={18} />
                    <span className="cursor-pointer">Add User</span>
                </button>
            </div>

            <div className="bg-gray-800 bg-opacity-5 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Profile Image</div>
                    <div className="col-span-2">Join Date</div>
                </div>

                {users &&
                    users.map((user) => (
                        <div
                            key={user._id}
                            className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <div className="col-span-3">
                                <div className="flex items-center">
                                    <img
                                        src={user.profileImage}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="flex space-x-3 mt-1">
                                            <button className="text-blue-600 text-sm hover:underline">
                                                Edit
                                            </button>
                                            <button className="text-red-600 text-sm hover:underline">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3">{user.email}</div>
                            <div className="col-span-2">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${user.isAdmin
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                        }`}
                                >
                                    {user.isAdmin ? 'Admin' : 'User'}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <img
                                    src={user.profileImage}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full"
                                />
                            </div>
                            <div className="col-span-2">{new Date(user.createdAt).toLocaleDateString()}</div>
                        </div>
                    ))}
            </div>

            {/* User Creation Form */}
            <CreateUser
                isOpen={isFormOpen}
                onSuccess={handleCreateUser} // ✅ fixed prop name
                onCancel={() => setIsFormOpen(false)}
            />
        </div>
    );
};

export default UsersContent;
