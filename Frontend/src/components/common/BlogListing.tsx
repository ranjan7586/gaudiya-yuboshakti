import React, { useEffect, useState } from 'react';
import { Mail, Facebook, Twitter, Link2, Linkedin, MessageCircle } from 'lucide-react';
import Header from '../user/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../user/Footer';
import axios from 'axios';

// Types for our blog data
// interface Author {
//     name: string;
// }

interface BlogPost {
    _id: any;
    title: string;
    description: string;
    category: any;
    date: string;
    thumbnail_img: string;
    author: any;
    tags: string[];
}

// Contributors section data
interface Contributor {
    id: number;
    name: string;
    title: string;
    bio: string;
    thumbnail_img: string;
}

const contributors: Contributor[] = [
    {
        id: 1,
        name: "Anirban Sarma",
        title: "Director of the Digital Societies Initiative",
        bio: "Anirban Sarma is Director of the Digital Societies Initiative at the Observer Research Foundation. His research explores issues of technology policy, with a focus on the digital economy, platform governance, AI, digital public infrastructure, sectoral applications of ICTs, and the...",
        thumbnail_img: "https://aaft.com/blog/wp-content/uploads/2025/02/Rajdeep-Sardesai-1-1024x575.jpg"
    },
    {
        id: 2,
        name: "Jane Doe",
        title: "Senior Researcher",
        bio: "Jane specializes in international relations with a focus on cyber security and emerging technologies...",
        thumbnail_img: "https://aaft.com/blog/wp-content/uploads/2025/02/Vikrant-Gupta.webp"
    }
];

// Social share icons component
const SocialShareButtons: React.FC = () => {
    return (
        <div className="flex space-x-2 items-center">
            <Mail size={18} className="text-blue-500 cursor-pointer" />
            <Facebook size={18} className="text-blue-500 cursor-pointer" />
            <Twitter size={18} className="text-blue-500 cursor-pointer" />
            <Link2 size={18} className="text-blue-500 cursor-pointer" />
            <Linkedin size={18} className="text-blue-500 cursor-pointer" />
            <MessageCircle size={18} className="text-blue-500 cursor-pointer" />
        </div>
    );
};

// Blog post card component
const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/blog/details/${post._id}`)} className="flex flex-row items-start gap-4 py-6 border-b border-gray-200 cursor-pointer">
            <div className="w-1/3 min-w-1/3">
                <img
                    src={post.thumbnail_img}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                />
            </div>
            <div className="w-2/3 flex flex-col">
                <Link
                    to={`/list/category/${post?.category?.name}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-sm text-blue-600 font-medium mb-1">{post?.category?.name}</div>
                </Link>
                <div className='flex justify-between'>
                    <SocialShareButtons />
                    <span className="text-orange-500 text-sm">{post.date}</span>
                </div>
                <h2 className="text-lg font-bold mb-2 hover:text-blue-600 cursor-pointer">{post.title}</h2>
                <div className="text-gray-700 mb-4 text-sm"><div dangerouslySetInnerHTML={{ __html: post?.description.substring(0, 300) + '...' || '' }} />
                </div>
                <div className="mt-auto">
                    <div className="text-gray-500 text-sm uppercase font-semibold">
                        <span>
                            {post?.author?.name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Contributor card component
const ContributorCard: React.FC<{ contributor: Contributor }> = ({ contributor }) => {
    return (
        <div className="mb-8">
            <img
                src={contributor.thumbnail_img}
                alt={contributor.name}
                className="w-full h-64 object-cover mb-3"
            />
            <h3 className="text-lg font-bold mb-1">{contributor.name}</h3>
            <p className="text-gray-700 text-sm mb-2">{contributor.title}</p>
            <p className="text-gray-600 text-sm mb-4">{contributor.bio}</p>
            <button className="text-blue-600 flex items-center text-sm font-medium">
                Read More
                <span className="ml-1">+</span>
            </button>
        </div>
    );
};

// Main blog page component
const BlogListing: React.FC = () => {
    const display_per_page = 5;
    const { type, filter_type } = useParams();
    const [page, setPage] = useState(1);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [hasMore, setHasMore] = useState(true); // To indicate if there are more posts to load

    const fetchBlogPosts = async (currentPage: number, append: boolean = false) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/list`, {
                page: currentPage,
                display_per_page,
                filterType: filter_type,
                filterBy: type
            });

            if (data.data.length > 0) {
                if (append) {
                    setBlogPosts(prev => [...prev, ...data.data]);
                } else {
                    setBlogPosts(data.data);
                }
                setHasMore(data.data.length === display_per_page); // If we get less than display_per_page, no more data
            } else {
                setHasMore(false); // No more data
            }
        } catch (error) {
            console.error(error);
            setHasMore(false); // Assume no more on error
        }
    };

    // Effect to handle initial load and filter changes
    useEffect(() => {
        setBlogPosts([]); // Clear posts when filter changes
        setPage(1);       // Reset page to 1
        setHasMore(true); // Assume there's more data initially
        // Fetch new data for the changed filter, starting from page 1
        fetchBlogPosts(1, false);
    }, [type, filter_type]);

    // Effect to handle "Load More" clicks
    useEffect(() => {
        // Only fetch if page is greater than 1, as initial/filter fetch is handled above
        if (page > 1) {
            fetchBlogPosts(page, true);
        }
    }, [page]); // This effect now solely reacts to `page` increments

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <Header />
            <div className='min-h-screen pt-64'>
                <div className="title p-10 text-center">
                    <p className='text-xl'>Home / <span className='text-orange-600'>{type}</span></p>
                    <p className='text-4xl pt-6 uppercase font-bold'>{type}</p>
                </div>
                <div className="bg-white min-h-screen">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Main content - Blog posts */}
                            <div className="w-full lg:w-3/4">
                                <div className="mb-8">
                                    {blogPosts.map(post => (
                                        <BlogPostCard key={post._id} post={post} />
                                    ))}
                                    {blogPosts.length === 0 && (
                                        <div className="text-center text-gray-600 text-lg mt-8">No blog posts found for this category.</div>
                                    )}
                                </div>
                                {hasMore && blogPosts.length > 0 && ( // Only show Load More if there's data and potentially more
                                    <div className="flex justify-center mt-8">
                                        <button onClick={handleLoadMore} className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition">
                                            Load More
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar - Contributors */}
                            <div className="w-full lg:w-1/4">
                                <div className="bg-white p-4">
                                    <h2 className="text-2xl font-bold mb-6">Contributors</h2>
                                    {contributors.map(contributor => (
                                        <ContributorCard key={contributor.id} contributor={contributor} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogListing;