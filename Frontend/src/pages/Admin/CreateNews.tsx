import { useState } from 'react';
import { Calendar, Clock, Image, Users, Bookmark, User, FileText } from 'lucide-react';

export default function NewsSubmissionForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
    date: '',
    readTime: '',
    thumbnail_img: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        author: '',
        date: '',
        readTime: '',
        thumbnail_img: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <h1 className="text-xl font-semibold">NewsPress Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <User size={16} />
              </div>
              <span>Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white min-h-screen">
          <div className="p-4">
            <nav className="mt-6 space-y-1">
              <div className="flex items-center px-4 py-3 bg-gray-700 rounded-lg">
                <FileText className="mr-3" size={20} />
                <span>Posts</span>
              </div>
              <div className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg">
                <Image className="mr-3" size={20} />
                <span>Media</span>
              </div>
              <div className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg">
                <Users className="mr-3" size={20} />
                <span>Users</span>
              </div>
              <div className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg">
                <Bookmark className="mr-3" size={20} />
                <span>Categories</span>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Article</h2>
            </div>

            {isSuccess && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p>Article published successfully!</p>
              </div>
            )}

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter article title"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter article content"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="politics">Politics</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Author */}
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Author name"
                        required
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Publication Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Read Time */}
                  <div>
                    <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Read Time (minutes)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="readTime"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleChange}
                        min="1"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="5"
                        required
                      />
                    </div>
                  </div>

                  {/* Thumbnail Image */}
                  <div>
                    <label htmlFor="thumbnail_img" className="block text-sm font-medium text-gray-700 mb-1">
                      Thumbnail Image URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Image size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="thumbnail_img"
                        name="thumbnail_img"
                        value={formData.thumbnail_img}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Preview Image */}
                {formData.thumbnail_img && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thumbnail Preview
                    </label>
                    <div className="w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
                      <img 
                        src="/api/placeholder/320/320" 
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-md text-white font-medium ${
                      isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all`}
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}