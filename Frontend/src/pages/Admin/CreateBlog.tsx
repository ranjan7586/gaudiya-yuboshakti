import { toast } from 'react-toastify';
import axiosAuth from '../../config/axios_auth';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogEditor from '../../components/common/BlogEditor';
import { Calendar, Clock, Image, User } from 'lucide-react';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
type User = {
  _id: string;
  name: string;
  email: string;
};

interface CreateBlogProps {
  is_update?: boolean
}

const CreateBlog: React.FC<CreateBlogProps> = ({ is_update = false }: CreateBlogProps) => {
  const [updateId, setUpdateId] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    tags: string[];
    author: string;
    date: string;
    readTime: string;
    thumbnail_img: File | null | string;
  }>({
    title: '',
    description: '',
    category: '',
    tags: [],
    author: '',
    date: '',
    readTime: '',
    thumbnail_img: null
  });
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    setUpdateId(id);
    if (is_update) {
      const fetchBlog = async () => {
        try {
          const { data } = await axiosAuth.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`);
          setFormData({
            title: data.data.title,
            description: data.data.description,
            category: data.data.category,
            tags: data.data.tags,
            author: data.data.author,
            date: data.data.date,
            readTime: data.data.readTime,
            thumbnail_img: data.data.thumbnail_img
          });
        } catch (error) {
          console.log(error)
        }
      }
      fetchBlog();
    }
  }, [])

  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');


  const [darkMode, setDarkMode] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('posts');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/users`);
      if (data) setUsers(data.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (value: any) => {
    setFormData(prev => ({ ...prev, description: value }));
  };
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      tags: checked
        ? [...prev.tags, value] // add tag
        : prev.tags.filter(tag => tag !== value) // remove tag
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (is_update) {
        console.log(formData);
        const { data } = await axiosAuth.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/update/${updateId}`, formData, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        });
        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success(data.data.message);
        setFormData({
          title: '',
          description: '',
          category: '',
          tags: [] as string[],
          author: '',
          date: '',
          readTime: '',
          thumbnail_img: null
        });
        navigate('/admin/dashboard');
        return;
      } else {
        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('category', formData.category);
        formData.tags.forEach(tag => {
          form.append("tags", tag);
        });
        form.append('author', formData.author);
        form.append('date', formData.date);
        form.append('readTime', formData.readTime);

        if (formData.thumbnail_img) {
          form.append('thumbnail_img', formData.thumbnail_img); // ✅ File goes here
        }
        const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/create`, form, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        });
        console.log(data);
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({
          title: '',
          description: '',
          category: '',
          tags: [] as string[],
          author: '',
          date: '',
          readTime: '',
          thumbnail_img: null
        });
      }
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      {/* <header className="bg-gray-900 text-white px-6 py-4">
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
      </header> */}

      <div className="flex">
        {/* Main Content - WordPress-like Layout */}
        {isSuccess && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p>Article published successfully!</p>
          </div>
        )}
        <div className="form_content p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Article</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Title and Editor (Full Height) */}
            <div className="lg:w-2/3 flex flex-col">
              {/* Title */}
              <div className="bg-white shadow-md rounded-lg mb-6 p-6">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-xl border-0 focus:ring-0 focus:outline-none font-bold"
                  placeholder="Enter article title"
                  required
                />
              </div>

              {/* Description - Blog Editor (Full Height) */}
              <div className="bg-white shadow-md rounded-lg flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Content</h3>
                </div>
                <div className="flex-1 p-4 overflow-auto">
                  <BlogEditor value={formData.description} setValue={handleEditorChange} />
                </div>
              </div>
            </div>

            {/* Right Column - Settings and Publish */}
            <div className="lg:w-1/3 space-y-6">
              {/* Publish Panel */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Publish</h3>
                </div>
                <div className="p-4 space-y-4">
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

                  {/* Submit Button */}
                  <div className="flex flex-col space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 rounded-md text-white font-medium ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all`}
                    >
                      {isSubmitting ? is_update ? 'Updating...' : 'Publishing...' : is_update ? 'Update Article' : 'Publish Article'}
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 rounded-md text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                    >
                      Save Draft
                    </button>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Category</h3>
                </div>
                <div className="p-4">
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
              </div>

              {/* Tags */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Tags</h3>
                </div>
                <div className="p-4 space-y-2">
                  {['featured', 'trending', 'popular', 'latest'].map((tag) => (
                    <label key={tag} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="tags"
                        value={tag}
                        checked={formData.tags.includes(tag)}
                        onChange={handleTagChange}
                        className="form-checkbox h-4 w-4 text-blue-600 m-2"
                      />
                      <span className="text-gray-700 capitalize">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Author Select */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Author</h3>
                </div>
                <div className="p-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <select
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Author</option>
                      {users.length > 0 ? (
                        users.map(user => (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading users...</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>


              {/* Read Time */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Read Time</h3>
                </div>
                <div className="p-4">
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
              </div>

              {/* Featured Image */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Featured Image</h3>
                </div>
                <div className="p-4 space-y-4">
                  {/* File Upload Area */}
                  {!formData.thumbnail_img && (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                      <input
                        type="file"
                        id="thumbnail_img_file"
                        name="thumbnail_img_file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            console.log("Selected file:", file);

                            setFormData((prev) => ({
                              ...prev,
                              thumbnail_img: file, // now setting the file object directly
                            }));
                          }
                        }}
                      />

                      <label htmlFor="thumbnail_img_file" className="cursor-pointer flex flex-col items-center">
                        <Image size={36} className="text-gray-400 mb-2" />
                        <span className="text-gray-700 font-medium">Set featured image</span>
                        <span className="text-gray-500 text-sm mt-1">or drag and drop</span>
                        <span className="text-gray-500 text-xs mt-2">PNG, JPG, GIF up to 10MB</span>
                      </label>
                    </div>
                  )}

                  {/* Preview Image */}
                  {formData.thumbnail_img && (
                    <div className="space-y-3">
                      <div className="w-full border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                        <img
                          src={typeof formData.thumbnail_img === 'string' ?
                            formData.thumbnail_img :
                            URL.createObjectURL(formData.thumbnail_img)}
                          alt="Thumbnail preview"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:text-red-800 font-medium"
                          onClick={() => setFormData(prev => ({ ...prev, thumbnail_img: null }))}
                        >
                          Remove featured image
                        </button>
                        <button
                          type="button"
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          onClick={() => setFormData(prev => ({ ...prev, thumbnail_img: null }))}
                        >
                          Replace image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog