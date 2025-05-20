import { Plus } from 'lucide-react';
// type Props = {}

const CategoriesContent = () => {
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
    )
}

export default CategoriesContent