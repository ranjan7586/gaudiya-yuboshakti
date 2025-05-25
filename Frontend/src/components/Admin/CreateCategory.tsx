import React, { useEffect, useState } from 'react';

interface Props {
    handleCreate: (name: string, slug: string, description: string) => void;
    handleUpdate: (id: string, name: string, slug: string, description: string) => void;
    categoryData: any;
}

const CreateCategory: React.FC<Props> = ({ handleCreate, categoryData, handleUpdate }) => {
    console.log("render")
    const [formData, setFormData] = useState({ name: '', slug: '', description: '' });

    useEffect(() => {
        setFormData({
            name: categoryData?.name || '',
            slug: categoryData?.slug || '',
            description: categoryData?.description || ''
        });
    }, [categoryData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const { name, slug, description } = formData;
        if (categoryData?._id) {
            handleUpdate(categoryData._id, name, slug, description);
        } else {
            handleCreate(name, slug, description);
        }
        setFormData({ name: '', slug: '', description: '' });
    };

    return (
        <div className="bg-gray-800 bg-opacity-5 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
                {categoryData ? 'Update Category' : 'Add New Category'}
            </h3>
            <div className="space-y-4">
                {(['name', 'slug', 'description'] as const).map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                        {field === 'description' ? (
                            <textarea
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full p-2 border rounded bg-transparent"
                                rows={3}
                                placeholder="Description..."
                            />
                        ) : (
                            <input
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                type="text"
                                className="w-full p-2 border rounded bg-transparent"
                                placeholder={field === 'slug' ? 'category-slug' : 'Category name'}
                            />
                        )}
                    </div>
                ))}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                >
                    {categoryData ? 'Update Category' : 'Add Category'}
                </button>
            </div>
        </div>
    );
};

export default CreateCategory;
