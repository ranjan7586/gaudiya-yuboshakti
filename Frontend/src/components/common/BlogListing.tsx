import React from 'react';
import { Mail, Facebook, Twitter, Link2, Linkedin, MessageCircle } from 'lucide-react';
import Header from '../user/Header';
import { useParams } from 'react-router-dom';

// Types for our blog data
interface Author {
    name: string;
}

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    imageUrl: string;
    authors: Author[];
}

// Sample data to populate our blog listing
const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Rethinking India's Cyber Readiness in the Age of Information Warfare",
        excerpt: "As cyber operations blur with psychological warfare, India must build resilience not just in systems, but in narratives, perception, and public trust...",
        category: "Cyber Security | Cyber and Technology",
        date: "May 17, 2025",
        imageUrl: "/api/placeholder/400/300",
        authors: [{ name: "SOUMYA AWASTHI" }, { name: "ABHISHEK SHARMA" }]
    },
    {
        id: 2,
        title: "Poland Prepares for a Pivotal Presidential Election",
        excerpt: "Poland heads to a pivotal presidential vote on 18 May, where progressive and conservative forces clash in a tight three-way race for the top office...",
        category: "International Affairs",
        date: "May 17, 2025",
        imageUrl: "/api/placeholder/400/300",
        authors: [{ name: "SHAIREE MALHOTRA" }]
    },
    {
        id: 3,
        title: "Operation Sindoor: The Pakistan Problem Temporarily Contained, Not Permanently Addressed",
        excerpt: "India's Operation Sindoor calls Pakistan's nuclear bluff and resets the rules of engagement with a clear new redline: terror will cost more than ever...",
        category: "International Affairs",
        date: "May 16, 2025",
        imageUrl: "/api/placeholder/400/300",
        authors: [{ name: "SUSHANT SAREEN" }]
    },
    {
        id: 4,
        title: "From the Brink: US Mediates India-Pakistan De-escalation",
        excerpt: "Following heightened tensions, diplomatic efforts led by the US have helped reduce conflict between the nuclear-armed neighbors...",
        category: "International Affairs",
        date: "May 16, 2025",
        imageUrl: "/api/placeholder/400/300",
        authors: [{ name: "JOHN SMITH" }]
    }
];

// Contributors section data
interface Contributor {
    id: number;
    name: string;
    title: string;
    bio: string;
    imageUrl: string;
}

const contributors: Contributor[] = [
    {
        id: 1,
        name: "Anirban Sarma",
        title: "Director of the Digital Societies Initiative",
        bio: "Anirban Sarma is Director of the Digital Societies Initiative at the Observer Research Foundation. His research explores issues of technology policy, with a focus on the digital economy, platform governance, AI, digital public infrastructure, sectoral applications of ICTs, and the...",
        imageUrl: "/api/placeholder/400/400"
    },
    {
        id: 2,
        name: "Jane Doe",
        title: "Senior Researcher",
        bio: "Jane specializes in international relations with a focus on cyber security and emerging technologies...",
        imageUrl: "/api/placeholder/400/400"
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
    return (
        <div className="flex flex-row items-start gap-4 py-6 border-b border-gray-200">
            <div className="w-1/3 min-w-1/3">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                />
            </div>
            <div className="w-2/3 flex flex-col">
                <div className="text-sm text-blue-600 font-medium mb-1">{post.category}</div>
                <SocialShareButtons />
                <span className="text-gray-500 text-sm my-2">{post.date}</span>
                <h2 className="text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <div className="mt-auto">
                    <div className="text-gray-500 text-sm uppercase font-semibold">
                        {post.authors.map((author, index) => (
                            <span key={index}>
                                {author.name}
                                {index < post.authors.length - 1 ? ' | ' : ''}
                            </span>
                        ))}
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
                src={contributor.imageUrl}
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
    const { type } = useParams();
    console.log(type)
    return (
        <>
            <Header />
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
                                    <BlogPostCard key={post.id} post={post} />
                                ))}
                            </div>
                            <div className="flex justify-center mt-8">
                                <button className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition">
                                    Load More
                                </button>
                            </div>
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
        </>
    );
};

export default BlogListing;