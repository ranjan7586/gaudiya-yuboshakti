import { Plus } from 'lucide-react';
import { setUsers } from '../../contexts/UserContext';

// type Props = {}

const UsersContent = () => {
    const { users } = setUsers();
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
                    <div className="col-span-2">Profile Image</div>
                    <div className="col-span-2">Join Date</div>
                </div>

                {users && users.map(user => (
                    <div key={user._id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800">
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
                            <span className={`px-2 py-1 rounded-full text-xs ${user.isAdmin !== true ? 'bg-blue-100 text-blue-800' :
                                /*user.role === 'Editor' ?*/ 'bg-green-100 text-green-800' //:
                                    // user.role === 'Author' ? 'bg-purple-100 text-purple-800' :
                                    //     'bg-gray-100 text-gray-800'
                                }`}>
                                {user.isAdmin !== true ? 'User' : 'Admin'}
                            </span>
                        </div>
                        <div className="col-span-2"><img src={user.profileImage} alt={user.name} className="w-8 h-8 rounded-full" /></div>
                        <div className="col-span-2">{user.createdAt}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersContent