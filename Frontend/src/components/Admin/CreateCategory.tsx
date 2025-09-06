import React, { useEffect, useState } from 'react';

interface Props {
    handleCreate: (name: string, slug: string, description: string, parentId: string | null) => void;
    handleUpdate: (id: string, name: string, slug: string, description: string, parentId: string | null) => void;
    categoryData: any;
    categories: any[]; // Add the categories prop
}

const CreateCategory: React.FC<Props> = ({ handleCreate, categoryData, handleUpdate, categories }) => {
    console.log(categoryData)
    const [formData, setFormData] = useState({ name: '', slug: '', description: '' });
    const [parentId, setParentId] = useState<string | null>(null);

    useEffect(() => {
        setFormData({
            name: categoryData?.name || '',
            slug: categoryData?.slug || '',
            description: categoryData?.description || ''
        });
        setParentId(categoryData?.parent?._id || '');
    }, [categoryData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setParentId(value === '' ? null : value);
    };

    const handleSubmit = () => {
        const { name, slug, description } = formData;
        if (categoryData?._id) {
            handleUpdate(categoryData._id, name, slug, description, parentId);
        } else {
            handleCreate(name, slug, description, parentId);
        }
        setFormData({ name: '', slug: '', description: '' });
        setParentId(null);
    };

    return (
        <div className="bg-gray-800 bg-opacity-5 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
                {categoryData ? 'Update Category' : 'Add New Category'}
            </h3>
            <div className="space-y-4">
                {/* Name, Slug, Description inputs (same as before) */}
                <div>
                    <label className="block text-sm font-medium mb-1 capitalize">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        className="w-full p-2 border rounded bg-transparent"
                        placeholder="Category name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 capitalize">Slug</label>
                    <input
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        type="text"
                        className="w-full p-2 border rounded bg-transparent"
                        placeholder="category-slug"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 capitalize">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-transparent"
                        rows={3}
                        placeholder="Description..."
                    />
                </div>
                
                {/* Parent Category Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1 capitalize">Parent Category</label>
                    <select
                        name="parentId"
                        value={parentId || ''}
                        onChange={handleParentChange}
                        className="w-full p-2 border border-white rounded bg-transparent"
                    >
                        <option value="" className='text-white'>-- None --</option>
                        {categories.map((cat) => (
                            // Prevent a category from being its own parent
                            categoryData?._id !== cat._id && (
                                <option key={cat._id} value={cat._id} className='text-gray-900'>{cat.name}</option>
                            )
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white p-2 rounded hover:bg-white hover:text-black transition-all duration-400 cursor-pointer"
                >
                    {categoryData ? 'Update Category' : 'Add Category'}
                </button>
            </div>
        </div>
    );
};

export default CreateCategory;