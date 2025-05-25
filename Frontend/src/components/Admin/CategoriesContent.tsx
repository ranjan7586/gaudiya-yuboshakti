import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import CreateCategory from './CreateCategory';
import axiosAuth from '../../config/axios_auth';
import DeleteConfirmPopup from '../common/DeleteConfirmPopup';
interface Category {
    _id: string,
    name: string,
    slug: string,
    count: number,
    description: string
}

const CategoriesContent = () => {
    console.log("parent render");
    const [categories, setCategories] = useState<Category[]>([]);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [updateCategory, setUpdateCategory] = useState<Category | null>(null);

    const fetchCategories = async () => {
        try {
            const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/list`);
            if (data?.data) setCategories(data.data);
            console.log(data)
        } catch (error) {
            toast.error('Error fetching categories');
        }
    }

    const handleDelete = async () => {
        try {
            const { data } = await axiosAuth.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/delete/${selectedCategory?._id}`)
            console.log(data)
            toast.success(data.message);
            setIsDeletePopupOpen(false);
            setSelectedCategory(null);
            fetchCategories();
        } catch (error) {
            toast.error('Error deleting category');
        }
    }

    const handleCreate = async (name: string, slug: string, description: string) => {
        try {
            const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/create`, { name, slug, description });
            toast.success(data.message);
            fetchCategories();
        } catch (error) {
            toast.error('Error creating category');
        }
    }

    const handleUpdate: any = async (id: string, name: string, slug: string, description: string) => {
        try {
            const { data } = await axiosAuth.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/update/${id}`, { name, slug, description });
            toast.success(data.message);
            fetchCategories();
            setUpdateCategory(null);
        } catch (error) {
            toast.error('Error updating category');
        }
    }

    const handleCancelDelete = () => {
        setIsDeletePopupOpen(false);
        setSelectedCategory(null);
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <p className="text-gray-500">Manage your blog categories</p>
                </div>
                <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    <Plus size={18} />
                    <span className='cursor-pointer' onClick={() => setUpdateCategory(null)}>Add New</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <CreateCategory handleCreate={handleCreate} categoryData={updateCategory} handleUpdate={handleUpdate} />
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
                            <div key={category._id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                <div className="col-span-3">
                                    <div className="font-medium">{category.name}</div>
                                    <div className="flex space-x-3 mt-1">
                                        <button className="text-blue-600 text-sm hover:underline cursor-pointer" onClick={() => {setUpdateCategory(category)}}>Edit</button>
                                        <button className="text-red-600 text-sm hover:underline cursor-pointer" onClick={() => { setIsDeletePopupOpen(true); setSelectedCategory(category) }} >Delete</button>
                                    </div>
                                </div>
                                <div className="col-span-3">{category.slug}</div>
                                <div className="col-span-4">{category.description}</div>
                                <div className="col-span-2">{category?.count?.toString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Popup */}
            <DeleteConfirmPopup
                isOpen={isDeletePopupOpen}
                onConfirm={handleDelete}
                onCancel={handleCancelDelete}
                itemName={selectedCategory?.name || undefined}
            />
        </div>
    )
}

export default CategoriesContent