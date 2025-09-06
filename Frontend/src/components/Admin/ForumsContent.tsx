import { toast } from 'react-toastify';
import React, { useEffect } from 'react'
import axiosAuth from '../../config/axios_auth';
import { Link, NavLink } from 'react-router-dom';
import { Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import DeleteConfirmPopup from '../common/DeleteConfirmPopup';

// interface IForum extends mongoose.Document {
//     title: string;
//     description: string;
//     author: mongoose.Schema.Types.ObjectId;
//     date: string;
//     tags: string[];
//     readTime: string;
//     thumbnail_img: string;
//     deletedAt: Date;
// }

// type Props = {}
interface Forum {
    _id: number;
    title: string;
    description: string;
    author: any;
    date: string;
    tags: any;
    readTime: string;
    thumbnail_img: string;
    deletedAt: Date;
}

const ForumsContent = () => {
    const [forums, setForums] = React.useState<Forum[]>([]);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
    const [selectedForum, setSelectedForum] = React.useState<Forum | null>(null);

    const fetchForums = async () => {
        try {
            const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/forums/list`, {
                page: 1,
                limit: 10
            });
            if (data?.data) setForums(data.data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async () => {
        try {
            const { data } = await axiosAuth.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/forums/delete/${selectedForum?._id}`)
            console.log(data)
            toast.success(data.message);
            setIsDeletePopupOpen(false);
            setSelectedForum(null);
            fetchForums();
        } catch (error) {
            toast.error('Error deleting category');
        }
    }
    const handleCancelDelete = () => {
        setIsDeletePopupOpen(false);
        setSelectedForum(null);
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
        fetchForums();
        // fetchUsers();
    }, [])
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Forums</h1>
                    <p className="text-gray-500">Manage your forums</p>
                </div>
                <NavLink to={'/admin/forums/add-forum'}>
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
                    <div className="col-span-2">Description</div>
                    <div className="col-span-2">Tags</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-2">Date</div>
                </div>

                {forums.map(forum => (
                    <div key={forum._id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="col-span-5 flex items-center">
                            <div className="flex-1">
                                <div className="font-medium">{forum.title}</div>
                                <div className="flex space-x-3 mt-1">
                                    <NavLink to={`/admin/forums/update-forum/${forum._id}`} className="text-blue-600 text-sm hover:underline">Edit</NavLink>
                                    <button className="text-red-600 text-sm hover:underline cursor-pointer" onClick={() => { setIsDeletePopupOpen(true); setSelectedForum(forum) }}>Delete</button>
                                    <Link to={`/blog/details/${forum._id}`}> <button className="text-gray-600 text-sm hover:underline cursor-pointer">View</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">{forum?.author?.name}</div>
                        <div className="col-span-2">{forum?.author?.description}</div>
                        <div className="col-span-2">{forum?.tags?.name ?? 'N/A'}</div>
                        <div className="col-span-2">{forum.date}</div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                    Showing 1-5 of 5 forums
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
            <DeleteConfirmPopup
                isOpen={isDeletePopupOpen}
                onConfirm={handleDelete}
                onCancel={handleCancelDelete}
                itemName={selectedForum?.title || undefined}
            />
        </div>
    )
}

export default ForumsContent