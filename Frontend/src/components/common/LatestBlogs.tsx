import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Author {
  name: string;
  profileImage: string;
}

interface BlogPost {
  _id: number;
  title: string;
  excerpt: string;
  category: any;
  author: Author;
  date: string;
  readTime: string;
  thumbnail_img: string;
}

const LatestBlogs: React.FC = () => {

  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const [latestBlogs, setlatestBlogs] = useState<BlogPost[]>([]);
  const getFeaturedBlogs = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/list`, {
        page: 1,
        limit: 9,
        filterType: 'tags',
        filterBy: 'latest',
      });
      setlatestBlogs(data.data);
    } catch (error) {
      console.log(error)
    }
  };
  React.useEffect(() => {
    getFeaturedBlogs();
  }, []);
  // Function to split posts into rows of 3
  const getRowsOfPosts = (posts: BlogPost[], postsPerRow: number = 3) => {
    const rows: BlogPost[][] = [];
    for (let i = 0; i < posts.length; i += postsPerRow) {
      rows.push(posts.slice(i, i + postsPerRow));
    }
    return rows;
  };

  const blogRows = getRowsOfPosts(latestBlogs);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest Articles</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Stay updated with our newest content across various topics and interests.
          </p>
        </div>

        {/* 3x3 Grid of Blog Posts (3 rows with 3 posts each) */}
        <div className="space-y-8">
          {blogRows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {row.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Featured profileImage */}
                  <div className="relative">
                    <img
                      src={post.thumbnail_img}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                        {post.category?.name}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author and Meta Info */}
                    <div className="flex items-center pt-4 border-t border-gray-100">
                      <img
                        src={post.author.profileImage}
                        alt={post.author?.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{post.author.name}</p>
                        <div className="flex text-xs text-gray-500">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <div className="px-5 pb-5">
                    <Link
                      to={`/blog/details/${post._id}`}
                      className="text-orange-500 font-medium text-sm flex items-center hover:text-indigo-800 transition-colors"
                    >
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to={`/list/tags/latest`}>
            <button className="px-8 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
              View All Articles
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;