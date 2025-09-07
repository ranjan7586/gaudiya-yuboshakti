import { toast } from 'react-toastify';
import axiosAuth from '../../config/axios_auth';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogEditor from '../../components/common/BlogEditor';
import { Calendar, Clock, Image, User } from 'lucide-react';

type User = {
  _id: string;
  name: string;
  email: string;
};

// Updated Category type to include a parent object with _id
type Category = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  parent?: {
    _id: string;
    name: string;
    slug: string;
  };
}

type Tag = {
  _id: string,
  name: string,
  slug: string,
  description: string
}

interface CreateBlogProps {
  is_update?: boolean
}

const CreateBlog: React.FC<CreateBlogProps> = ({ is_update = false }: CreateBlogProps) => {
  const [updateId, setUpdateId] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    // Changed to an array of strings to hold multiple category IDs
    categories: string[];
    tags: string[];
    author: string;
    date: string;
    readTime: string;
    thumbnail_img: File | null | string;
  }>({
    title: '',
    description: '',
    categories: [],
    tags: [],
    author: '',
    date: '',
    readTime: '',
    thumbnail_img: null
  });

  const { id } = useParams<{ id: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setUpdateId(id);
    if (is_update && id) {
      const fetchBlog = async () => {
        try {
          const { data } = await axiosAuth.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`);
          setFormData({
            title: data.data.title,
            description: data.data.description,
            // Extracting IDs from the array of category objects
            categories: data.data.categories.map((cat: { _id: string }) => cat._id),
            tags: data.data.tags.map((tag: { _id: string }) => tag._id),
            author: data.data.author?._id,
            date: data.data.date,
            readTime: data.data.readTime,
            thumbnail_img: data.data.thumbnail_img
          });
        } catch (error) {
          console.error("Failed to fetch blog data:", error);
        }
      }
      fetchBlog();
    }
  }, [is_update, id])

  const fetchUsers = async () => {
    try {
      const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/users`);
      if (data) setUsers(data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/list`);
      if (data.data) setCategories(data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }
  const fetchTags = async () => {
    try {
      const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tags/list`);
      if (data.data) setTags(data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  // New handler for category checkboxes
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter(catId => catId !== value)
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);

    // Append each category ID to the form data
    formData.categories.forEach(categoryId => {
      form.append('categories', categoryId);
    });

    formData.tags.forEach(tag => {
      form.append("tags", tag);
    });

    form.append('author', formData.author);
    form.append('date', formData.date);
    form.append('readTime', formData.readTime);

    if (formData.thumbnail_img instanceof File) {
      form.append('thumbnail_img', formData.thumbnail_img);
    }

    try {
      if (is_update && updateId) {
        const { data } = await axiosAuth.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/update/${updateId}`, form, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        });
        toast.success(data.message);
        navigate('/admin/posts');
      } else {
        const { data } = await axiosAuth.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/create`, form, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        });
        toast.success(data.message);
        // Reset form on successful creation
        setFormData({
          title: '',
          description: '',
          categories: [],
          tags: [] as string[],
          author: '',
          date: '',
          readTime: '',
          thumbnail_img: null
        });
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchUsers();
    fetchCategories();
  }, []);

  // Helper function to render categories in a tree structure
  const renderCategoryTree = (categoryList: Category[], parentId: string | undefined = undefined, depth: number = 0) => {
    return categoryList
      .filter(cat => (cat.parent?._id ?? undefined) === parentId)
      .map(category => (
        <div key={category._id} className="relative group">
          <label className={`inline-flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer`}
            style={{ paddingLeft: `${16 + depth * 20}px` }}>
            <input
              type="checkbox"
              name="categories"
              value={category._id}
              checked={formData.categories.includes(category._id)}
              onChange={handleCategoryChange}
              className="form-checkbox h-4 w-4 text-blue-600 rounded-md"
            />
            <span className="text-gray-700">{category.name}</span>
          </label>
          {/* Recursively render children */}
          {renderCategoryTree(categoryList, category._id, depth + 1)}
        </div>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="">
        <div className="form_content p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{is_update ? 'Update Article' : 'Add New Article'}</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3 flex flex-col">
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

              <div className="bg-white shadow-md rounded-lg flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Content</h3>
                </div>
                <div className="flex-1 p-4 overflow-auto">
                  <BlogEditor value={formData.description} setValue={handleEditorChange} />
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 space-y-6">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Publish</h3>
                </div>
                <div className="p-4 space-y-4">
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

              {/* Category Panel with tree-like structure */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Categories</h3>
                </div>
                <div className="p-4 h-60 overflow-y-auto custom-scrollbar">
                  {categories.length > 0 ? (
                    renderCategoryTree(categories, undefined, 0)
                  ) : (
                    <p className="text-center text-gray-500">No categories found.</p>
                  )}
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Tags</h3>
                </div>
                <div className="p-4 space-y-2">
                  {tags && tags.map((tag) => (
                    <label key={tag._id} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="tags"
                        value={tag._id}
                        checked={formData.tags.includes(tag._id)}
                        onChange={handleTagChange}
                        className="form-checkbox h-4 w-4 text-blue-600 m-2"
                      />
                      <span className="text-gray-700 capitalize">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>

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
                      value={formData.author || ''}
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

              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Featured Image</h3>
                </div>
                <div className="p-4 space-y-4">
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
                            setFormData((prev) => ({
                              ...prev,
                              thumbnail_img: file,
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

export default CreateBlog;
