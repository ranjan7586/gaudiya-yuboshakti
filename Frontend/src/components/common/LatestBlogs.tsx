import React from 'react';

interface Author {
  name: string;
  image: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: Author;
  date: string;
  readTime: string;
  image: string;
}

const LatestBlogs: React.FC = () => {
  const latestPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Psychology of Color in Web Design",
      excerpt: "How different color choices affect user perception and behavior on websites.",
      category: "Design",
      author: {
        name: "Emma Rodriguez",
        image: "/api/placeholder/40/40"
      },
      date: "April 18, 2025",
      readTime: "6 min read",
      image: "/api/placeholder/600/400"
    },
    {
      id: 2,
      title: "Understanding Modern JavaScript Frameworks",
      excerpt: "A comparison of React, Vue, and Angular for building interactive web applications.",
      category: "Development",
      author: {
        name: "Alex Thompson",
        image: "/api/placeholder/40/40"
      },
      date: "April 17, 2025",
      readTime: "9 min read",
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      title: "The Rise of AI in Healthcare",
      excerpt: "How artificial intelligence is transforming diagnosis and treatment in medicine.",
      category: "Technology",
      author: {
        name: "Dr. Maya Patel",
        image: "/api/placeholder/40/40"
      },
      date: "April 16, 2025",
      readTime: "7 min read",
      image: "/api/placeholder/600/400"
    },
    {
      id: 4,
      title: "Sustainable Fashion: Beyond the Trend",
      excerpt: "How eco-friendly clothing is reshaping the fashion industry from production to consumption.",
      category: "Lifestyle",
      author: {
        name: "Noah Garcia",
        image: "/api/placeholder/40/40"
      },
      date: "April 15, 2025",
      readTime: "5 min read",
      image: "/api/placeholder/600/400"
    },
    {
      id: 5,
      title: "Financial Planning for Millennials",
      excerpt: "Practical advice for saving, investing, and planning for the future in uncertain times.",
      category: "Finance",
      author: {
        name: "Olivia Wilson",
        image: "/api/placeholder/40/40"
      },
      date: "April 14, 2025",
      readTime: "8 min read",
      image: "/api/placeholder/600/400"
    },
    {
      id: 6,
      title: "The Science of Productivity",
      excerpt: "Research-backed methods to improve focus, energy, and output in your daily work.",
      category: "Productivity",
      author: {
        name: "Daniel Lee",
        image: "/api/placeholder/40/40"
      },
      date: "April 13, 2025",
      readTime: "10 min read",
      image: "/api/placeholder/600/400"
    },
    /*
    {
      id: 7,
      title: "Virtual Reality: The Next Education Revolution",
      excerpt: "How immersive technologies are changing the way students learn complex concepts.",
      category: "Education",
      author: {
        name: "Sofia Martinez",
        image: "/api/placeholder/40/40"
      },
      date: "April 12, 2025",
      readTime: "7 min read",
      image: "/api/placeholder/600/400"
    },
    {
      id: 8,
      title: "Building Resilience in Uncertain Times",
      excerpt: "Psychological tools for maintaining mental health during periods of change and stress.",
      category: "Wellness",
      author: {
        name: "Dr. James Williams",
        image: "/api/placeholder/40/40"
      },
      date: "April 11, 2025",
      readTime: "6 min read",
      image: "/api/placeholder/600/400"
    },
    {
      id: 9,
      title: "The Future of Remote Collaboration",
      excerpt: "New tools and practices that are making distributed teams more effective than ever.",
      category: "Business",
      author: {
        name: "Zoe Johnson",
        image: "/api/placeholder/40/40"
      },
      date: "April 10, 2025",
      readTime: "8 min read",
      image: "/api/placeholder/600/400"
    }*/
  ];

  // Function to split posts into rows of 3
  const getRowsOfPosts = (posts: BlogPost[], postsPerRow: number = 3) => {
    const rows: BlogPost[][] = [];
    for (let i = 0; i < posts.length; i += postsPerRow) {
      rows.push(posts.slice(i, i + postsPerRow));
    }
    return rows;
  };

  const blogRows = getRowsOfPosts(latestPosts);

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
                  key={post.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Featured Image */}
                  <div className="relative">
                    <img 
                      src={post.image} 
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
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Author and Meta Info */}
                    <div className="flex items-center pt-4 border-t border-gray-100">
                      <img 
                        src={post.author.image} 
                        alt={post.author.name} 
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
                    <a 
                      href="#" 
                      className="text-orange-500 font-medium text-sm flex items-center hover:text-indigo-800 transition-colors"
                    >
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;