import axios from "axios";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
interface FeaturedBlogsProps {
    _id: number;
    title: string;
    excerpt: string;
    category: string;
    author: any;
    date: string;
    readTime: string;
    thumbnail_img: string;
}
const FeaturedBlogs = () => {
    // const [page, setPage] = useState(1);
    // const [limit, setLimit] = useState(10);
    const [featuredPosts, setFeaturedPosts] = useState<FeaturedBlogsProps[]>([]);
    const getFeaturedBlogs = async () => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/list`, {
                page: 1,
                limit: 4,
                filterType: 'tags',
                filterBy: 'featured',
            });
            setFeaturedPosts(data.data);
        } catch (error) {
            console.log(error)
        }
    };
    React.useEffect(() => {
        getFeaturedBlogs();
    }, []);
    return (
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Articles</h2>
                        <div className="w-16 h-1 bg-orange-500"></div>
                    </div>
                    <NavLink to={"/list/featured"} className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors">
                        View All
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                        </svg>
                    </NavLink>
                </div>

                {/* Horizontal Scrolling Blog Posts */}
                <div className="relative">
                    <div className="flex overflow-x-auto pb-8 space-x-6 hide-scrollbar">
                        {featuredPosts.map((post) => (
                            <Link to={`/blog/details/${post._id}`} key={post._id} className="flex-none w-72 md:w-80">
                                <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                                    {/* Featured Image */}
                                    <div className="relative">
                                        <img
                                            src={post.thumbnail_img}
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        {/* Author and Meta Info */}
                                        <div className="flex items-center pt-3 border-t border-gray-100">
                                            {/* <img
                                                src={}
                                                alt={post.author}
                                                className="w-8 h-8 rounded-full mr-3"
                                            /> */}
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{post.author}</p>
                                                <p className="text-xs text-gray-500">{post.date} • {post.readTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>


                    {/* Optional scroll indicators */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
                        <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
                        <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator Dots */}
                <div className="flex justify-center space-x-2 mt-6">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                </div>
            </div>

            {/* Custom style to hide scrollbar while keeping functionality */}
            <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
};

export default FeaturedBlogs;