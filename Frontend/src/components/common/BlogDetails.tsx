import { useState, useEffect } from 'react';
import { ChevronRight, Heart, MessageCircle, Share2, Bookmark, Clock, Calendar, User } from 'lucide-react';

export default function BlogDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    // Simulate loading post data
    setTimeout(() => {
      setPost({
        id: 1,
        title: 'The Future of Web Development: Trends to Watch in 2025',
        excerpt: 'Discover the emerging technologies and methodologies shaping the future of web development in 2025 and beyond.',
        content: `
          <p class="mb-4">The web development landscape continues to evolve at a remarkable pace, with new technologies, frameworks, and methodologies emerging constantly. As we look ahead to the rest of 2025, several key trends are poised to reshape how we build and experience the web.</p>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">1. AI-Powered Development Tools</h2>
          <p class="mb-4">Artificial intelligence has made significant inroads into web development workflows. Developers now leverage AI assistants that can generate code, debug applications, and even design user interfaces. These tools not only boost productivity but also help bridge the gap between experienced developers and newcomers to the field.</p>
          <p class="mb-4">Code completion and suggestion systems have evolved beyond simple syntax hints to understand context and intent, offering sophisticated solutions that align with project requirements and best practices.</p>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">2. WebAssembly Goes Mainstream</h2>
          <p class="mb-4">WebAssembly (Wasm) has moved from an experimental technology to a mainstream solution for high-performance web applications. By allowing developers to run code written in languages like C++, Rust, and Go at near-native speed in browsers, Wasm has opened new possibilities for web applications that previously required native desktop solutions.</p>
          <p class="mb-4">Gaming, video editing, and complex data visualization applications now deliver desktop-like performance within the browser, blurring the line between web and native applications.</p>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">3. Edge Computing Integration</h2>
          <p class="mb-4">Edge computing has transformed how web applications are delivered and executed. By running code closer to users rather than in centralized data centers, edge functions reduce latency and improve user experience. This architectural shift has enabled new classes of applications that require real-time processing and responsiveness.</p>
          <p class="mb-4">The integration between CDNs and serverless platforms continues to deepen, allowing developers to deploy both static assets and dynamic functionality to the network edge with minimal configuration.</p>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">4. Enhanced Web Accessibility</h2>
          <p class="mb-4">Accessibility has rightfully moved from an afterthought to a fundamental consideration in web development. Browser tooling, testing frameworks, and development environments now include robust accessibility features by default, making it easier to create inclusive web experiences.</p>
          <p class="mb-4">This shift reflects both regulatory requirements and a growing recognition that accessible design benefits all users, not just those with disabilities.</p>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">5. Micro-Frontend Architecture</h2>
          <p class="mb-4">As web applications grow in complexity, micro-frontend architectures have emerged as a solution for scaling development across large teams. By breaking down monolithic frontend codebases into smaller, independently deployable pieces, organizations can improve development velocity while maintaining system coherence.</p>
          <p class="mb-4">Standardization of module federation and component communication patterns has addressed many of the early challenges with this approach, making it viable for more projects.</p>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
          <p class="mb-4">The web development field continues to evolve in exciting ways that enhance both developer experience and end-user satisfaction. By staying attuned to these trends and thoughtfully incorporating new tools and approaches, teams can build more powerful, accessible, and maintainable web applications.</p>
          <p class="mb-4">As with any technological shift, the key is not to chase every new trend, but to evaluate which advances align with your project goals and user needs. The most successful web development teams will be those that strike the right balance between innovation and pragmatism.</p>
        `,
        featuredImage: "/api/placeholder/1200/600",
        category: "Web Development",
        tags: ["JavaScript", "React", "Web Technology", "Programming"],
        publishedDate: "April 15, 2025",
        readTime: "8 min read",
        author: {
          name: "Alex Morgan",
          avatar: "/api/placeholder/80/80",
          role: "Senior Frontend Developer",
          bio: "Alex has been developing web applications for over 10 years and specializes in frontend architecture and performance optimization."
        },
        relatedPosts: [
          { id: 2, title: "Getting Started with WebAssembly in 2025", image: "/api/placeholder/400/250" },
          { id: 3, title: "Building Accessible Web Applications: A Comprehensive Guide", image: "/api/placeholder/400/250" },
          { id: 4, title: "The State of JavaScript Frameworks in 2025", image: "/api/placeholder/400/250" }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-gray-800">DevBlog</a>
          <div className="flex space-x-4">
            <a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a>
            <a href="/categories" className="text-gray-600 hover:text-gray-900">Categories</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Home</a>
            <ChevronRight size={16} className="mx-2" />
            <a href="/blog" className="hover:text-blue-600">Blog</a>
            <ChevronRight size={16} className="mx-2" />
            <a href={`/blog/category/${post.category.toLowerCase()}`} className="hover:text-blue-600">{post.category}</a>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-500 truncate max-w-xs">{post.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{post.category}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <div className="font-medium text-gray-900">{post.author.name}</div>
                <div className="text-sm text-gray-500">{post.author.role}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={16} className="mr-1" />
              <span>{post.publishedDate}</span>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={16} className="mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-auto"
          />
        </div>
        
        {/* Content Container */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Social Sharing Sidebar */}
          <div className="hidden md:flex flex-col items-center space-y-4 sticky top-8 h-fit">
            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
              <Heart size={20} className="text-gray-700" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
              <MessageCircle size={20} className="text-gray-700" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
              <Share2 size={20} className="text-gray-700" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
              <Bookmark size={20} className="text-gray-700" />
            </button>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <article className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <a 
                  key={index} 
                  href={`/blog/tag/${tag.toLowerCase()}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </a>
              ))}
            </div>
            
            {/* Mobile Social Sharing */}
            <div className="md:hidden flex justify-center space-x-4 my-8">
              <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                <Heart size={20} />
              </button>
              <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                <MessageCircle size={20} />
              </button>
              <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                <Share2 size={20} />
              </button>
              <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                <Bookmark size={20} />
              </button>
            </div>
            
            {/* Author Bio */}
            <div className="mt-12 bg-blue-50 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">About {post.author.name}</h3>
                  <p className="text-gray-700 mt-2">{post.author.bio}</p>
                  <a href={`/author/${post.author.name.toLowerCase().replace(' ', '-')}`} className="mt-2 inline-block text-blue-600 hover:underline">
                    View all posts
                  </a>
                </div>
              </div>
            </div>
            
            {/* Related Posts */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {post.relatedPosts.map(relatedPost => (
                  <a key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 group-hover:shadow-lg">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition duration-300">{relatedPost.title}</h4>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="bg-gray-900 text-white py-16 mt-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-2xl font-bold mb-3">Stay updated with our latest insights</h3>
          <p className="text-gray-300 mb-6">Join our newsletter and get weekly updates on web development trends and practices.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg text-gray-900 w-full sm:w-auto sm:flex-1 max-w-md"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white text-lg font-bold mb-4">DevBlog</h4>
              <p className="text-gray-400">Insights and resources for modern web developers.</p>
            </div>
            <div>
              <h4 className="text-white text-lg font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition">JavaScript</a></li>
                <li><a href="#" className="hover:text-white transition">Design</a></li>
                <li><a href="#" className="hover:text-white transition">Career</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-bold mb-4">Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition">Twitter</a>
                <a href="#" className="hover:text-white transition">GitHub</a>
                <a href="#" className="hover:text-white transition">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center text-gray-400">
            © {new Date().getFullYear()} DevBlog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}