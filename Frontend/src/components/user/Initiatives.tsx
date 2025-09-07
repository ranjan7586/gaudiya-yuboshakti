import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface BlogPost {
  _id: string; // Changed to _id to match Mongoose ObjectId
  title: string;
  categories: { _id: string; name: string }[];
  tags: { _id: string; name: string }[];
  date: string;
  author: { _id: string; name: string; profileImage: string };
  thumbnail_img: string;
}

interface Initiative {
  _id: string;
  name: string;
  slug: string;
}

const InitiativesSection: React.FC = () => {
  const [initiativesData, setInitiativesData] = useState<Initiative[]>([]);
  const [blogPostsData, setBlogPostsData] = useState<BlogPost[]>([]);
  const [selectedInitiative, setSelectedInitiative] = useState<string | null>(null);
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);

  const fetchInitiativesData = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/list`, {
        page: 1,
        display_per_page: 100,
        get_childs: true,
        parent_slug: "initiatives"
      });
      setInitiativesData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogPosts = async (slug: string) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/list`, {
        page: 1,
        display_per_page: 2,
        filterType: 'category',
        filterBy: slug
      });

      setBlogPostsData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccordionClick = (slug: string) => {
    setAccordionOpen(accordionOpen === slug ? null : slug);
    setSelectedInitiative(slug);
  };

  useEffect(() => {
    fetchInitiativesData();
  }, []);

  // Set the initial state when initiatives data is fetched
  useEffect(() => {
    if (initiativesData.length > 0 && selectedInitiative === null) {
      setSelectedInitiative(initiativesData[0].slug);
      setAccordionOpen(initiativesData[0].slug);
    }
  }, [initiativesData, selectedInitiative]);

  // Fetch blogs whenever the selected initiative changes
  useEffect(() => {
    if (selectedInitiative) {
      fetchBlogPosts(selectedInitiative);
    }
  }, [selectedInitiative]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row">
          {/* Mobile Accordion View */}
          <div className="w-full sm:hidden">
            <h2 className="text-2xl font-bold mb-4">Initiatives</h2>
            <div className="space-y-2">
              {initiativesData.map((initiative) => (
                <div key={initiative._id}>
                  <button
                    onClick={() => handleAccordionClick(initiative.slug)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-800 text-white rounded-lg transition-colors hover:bg-gray-700"
                  >
                    <span className="font-medium">{initiative.name}</span>
                    <ChevronUp
                      size={20}
                      className={`transition-transform duration-300 ${accordionOpen === initiative.slug ? 'transform rotate-0' : 'transform rotate-180'
                        }`}
                    />
                  </button>
                  {accordionOpen === initiative.slug && (
                    <div className="mt-2 p-4 bg-gray-800 rounded-lg">
                      <div className="grid gap-8">
                        {blogPostsData.length > 0 ? (
                          blogPostsData.map((blog) => (
                            <div
                              key={blog._id}
                              className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer"
                            >
                              <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-1/3">
                                  <img
                                    src={blog.thumbnail_img}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover"
                                  />
                                </div>
                                <div className="w-full sm:w-2/3 p-4 sm:p-6">
                                  <div className="flex items-center gap-4 mb-2 sm:mb-3">
                                    <span className="text-yellow-400 text-sm font-medium">
                                      {blog.categories.map(cat => cat.name).join(', ')}
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                      {new Date(blog.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 leading-tight">
                                    {blog.title}
                                  </h3>
                                  <div className="flex items-center">
                                    <div className="w-8 h-0.5 bg-yellow-400 mr-3"></div>
                                    <span className="text-yellow-400 text-sm font-medium uppercase tracking-wide">
                                      {blog.author.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-400 text-sm">No articles found for this initiative.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Sidebar View */}
          <div className="w-80 bg-gray-800 hidden sm:block">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-8">Initiatives</h2>
              <div className="space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
                {initiativesData.map((initiative) => (
                  <button
                    key={initiative._id}
                    onClick={() => setSelectedInitiative(initiative.slug)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${selectedInitiative === initiative.slug
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    {initiative.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area - Blog Cards (Desktop) */}
          <div className="flex-1 p-8 hidden sm:block">
            <div className="max-w-4xl mx-auto">
              {blogPostsData.length > 0 ? (
                <div className="grid gap-8">
                  {blogPostsData.map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer"
                    >
                      <div className="flex">
                        <div className="w-1/3">
                          <img
                            src={blog.thumbnail_img}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-yellow-400 text-sm font-medium">
                              {blog.categories.map(cat => cat.name).join(', ')}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {new Date(blog.date).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-4 leading-tight">
                            {blog.title}
                          </h3>
                          <div className="flex items-center">
                            <div className="w-8 h-0.5 bg-yellow-400 mr-3"></div>
                            <span className="text-yellow-400 text-sm font-medium uppercase tracking-wide">
                              {blog.author.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No articles found for this initiative.</p>
                </div>
              )}

              {/* View All Button */}
              {blogPostsData.length > 0 && (
                <div className="text-center mt-12">
                  <Link to={`/list/category/${selectedInitiative?.toLowerCase()}`} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                    View All
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button className="fixed bottom-6 right-6 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
        <ChevronUp size={20} />
      </button>
    </div>
  );
};

export default InitiativesSection;
