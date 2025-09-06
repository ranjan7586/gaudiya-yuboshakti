import CreateTag from './CreateTag';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axiosAuth from '../../config/axios_auth';
import DeleteConfirmPopup from '../common/DeleteConfirmPopup';

interface Tag {
    _id: string;
    name: string;
    slug: string;
    count?: number;
    description: string;
}

const TagsContent = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [updateTag, setUpdateTag] = useState<Tag | null>(null);

    const fetchTags = async () => {
        try {
            const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tags/list`);
            if (data?.data) setTags(data.data);
            console.log(data);
        } catch (error) {
            toast.error('Error fetching tags');
        }
    };

    const handleDelete = async () => {
        try {
            const { data } = await axiosAuth.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tags/delete/${selectedTag?._id}`);
            console.log(data);
            toast.success(data.message);
            setIsDeletePopupOpen(false);
            setSelectedTag(null);
            fetchTags();
        } catch (error) {
            toast.error('Error deleting tag');
        }
    };

    const handleCreate = async (name: string, slug: string, description: string) => {
        try {
            const payload = { name, slug, description };
            const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tags/create`, payload);
            toast.success(data.message);
            fetchTags();
        } catch (error) {
            toast.error('Error creating tag');
        }
    };

    const handleUpdate = async (id: string, name: string, slug: string, description: string) => {
        try {
            const payload = { name, slug, description };
            const { data } = await axiosAuth.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tags/update/${id}`, payload);
            toast.success(data.message);
            fetchTags();
            setUpdateTag(null);
        } catch (error) {
            toast.error('Error updating tag');
        }
    };

    const handleCancelDelete = () => {
        setIsDeletePopupOpen(false);
        setSelectedTag(null);
    };

    const handleEditClick = (tag: Tag) => {
        setUpdateTag(tag);
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Tags</h1>
                    <p className="text-gray-500">Manage your blog tags</p>
                </div>
                <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800" onClick={() => setUpdateTag(null)}>
                    <Plus size={18} />
                    <span>Add New</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <CreateTag
                    handleCreate={handleCreate}
                    tagData={updateTag}
                    handleUpdate={handleUpdate}
                />
                <div className="md:col-span-3">
                    <div className="bg-gray-800 bg-opacity-5 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                            <div className="col-span-4">Name</div>
                            <div className="col-span-4">Slug</div>
                            <div className="col-span-2">Count</div>
                            <div className="col-span-2">Description</div>
                        </div>

                        {tags.map(tag => (
                            <div key={tag._id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                <div className="col-span-4">
                                    <div className="font-medium">{tag.name}</div>
                                    <div className="flex space-x-3 mt-1">
                                        <button className="text-blue-600 text-sm hover:underline cursor-pointer" onClick={() => handleEditClick(tag)}>Edit</button>
                                        <button className="text-red-600 text-sm hover:underline cursor-pointer" onClick={() => { setIsDeletePopupOpen(true); setSelectedTag(tag) }}>Delete</button>
                                    </div>
                                </div>
                                <div className="col-span-4">{tag.slug}</div>
                                <div className="col-span-2">{tag?.count?.toString() || '0'}</div>
                                <div className="col-span-2">{tag.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DeleteConfirmPopup
                isOpen={isDeletePopupOpen}
                onConfirm={handleDelete}
                onCancel={handleCancelDelete}
                itemName={selectedTag?.name || undefined}
            />
        </div>
    );
};

export default TagsContent;
