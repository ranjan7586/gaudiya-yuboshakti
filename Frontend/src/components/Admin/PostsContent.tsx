import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import axiosAuth from '../../config/axios_auth';
import { Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { setUsers } from '../../contexts/UserContext';


// type Props = {}
interface Post {
    _id: number;
    title: string;
    author: any; // or define a type for author if you know it
    category: string;
    status: string;
    date: string;
}

const PostsContent = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const { users } = setUsers();

    const fetchPosts = async () => {
        try {
            const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/list`, {
                page: 1,
                limit: 10
            });
            if (data?.data) setPosts(data.data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    // const fetchUsers = async () => {
    //     try {
    //         const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/users`);
    //         if (data?.data) setAuthor(data.data);
    //         console.log(data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    useEffect(() => {
        fetchPosts();
        // fetchUsers();
    }, [])
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Posts</h1>
                    <p className="text-gray-500">Manage your blog posts</p>
                </div>
                <NavLink to={'/admin/posts/add-post'}>
                    <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                        <Plus size={18} />
                        <span>Add New</span>
                    </button>
                </NavLink>
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
                    <div key={post._id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="col-span-5 flex items-center">
                            <div className="flex-1">
                                <div className="font-medium">{post.title}</div>
                                <div className="flex space-x-3 mt-1">
                                    <NavLink to={`/admin/posts/update-post/${post._id}`} className="text-blue-600 text-sm hover:underline">Edit</NavLink>
                                    <button className="text-red-600 text-sm hover:underline">Delete</button>
                                    <button className="text-gray-600 text-sm hover:underline">View</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">{users && users.find((author: any) => author._id === post.author)?.name}</div>
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
    )
}

export default PostsContent