import { useState, useEffect } from 'react';
import { ChevronRight, Heart, MessageCircle, Share2, Bookmark, Clock, Calendar } from 'lucide-react';
import axios from 'axios';
// import Header from '../user/Header';
// import Footer from '../user/Footer';
import { Link } from 'react-router-dom';
interface Author {
  name: string;
  profileImage: string;
  role: string;
  bio: string;
}

interface relatedPost {
  id: number;
  title: string;
  image: string;
}

interface Post {
  id: number;
  title: string;
  excerpt: string;
  description: string;
  thumbnail_img: string;
  category: any;
  tags: {
    _id:string,
    name:string
  }[];
  date: string;
  readTime: string;
  author: Author;
  relatedPosts: relatedPost[];
}
export default function BlogDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const id = window.location.pathname.split('/').pop();
  console.log(id)
  const getPostDetails = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`);
      console.log(data)
      setPost(data.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPostDetails();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (<>
    {/* <Header /> */}
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-gray-800">Blog</a>
          {/* <div className="flex space-x-4">
            <a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a>
            <a href="/categories" className="text-gray-600 hover:text-gray-900">Categories</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </div> */}
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Home</a>
            <ChevronRight size={16} className="mx-2" />
            <a href="/blog" className="hover:text-blue-600">Blog</a>
            <ChevronRight size={16} className="mx-2" />
            <Link to={`/list/category/${post?.category?.name}`} className="hover:text-blue-600">{post?.category?.name}</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-500 truncate max-w-xs">{post?.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{post?.category?.name}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post?.title}</h1>

          <p className="text-xl text-gray-600 mb-6">{post?.excerpt}</p>

          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <img src={post?.author?.profileImage} alt={post?.author?.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <div className="font-medium text-gray-900">{post?.author?.name}</div>
                <div className="text-sm text-gray-500">{post?.author.role}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={16} className="mr-1" color='blue' />
              <span className='text-blue-400 font-semibold'>{post?.readTime}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-8">
          <Calendar size={16} className="mr-1" color='black' />
          <span className='mr-2 font-bold text-black'>Published On :</span><span className='text-blue-600 italic'>{post?.date}</span>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={post?.thumbnail_img}
            alt={post?.title}
            className="h-140 w-full"
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
              <div dangerouslySetInnerHTML={{ __html: post?.description || '' }} />
            </article>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post?.tags.map((tag, index) => (
                <a
                  key={index}
                  href={`/blog/tag/${tag?.name.toLowerCase()}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag?.name}
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
                <img src={post?.author?.profileImage} alt={post?.author.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">About {post?.author.name}</h3>
                  <p className="text-gray-700 mt-2">{post?.author.bio}</p>
                  {/* <a href={`/author/${post?.author.name.toLowerCase().replace(' ', '-')}`} className="mt-2 inline-block text-blue-600 hover:underline">
                    View all posts
                  </a> */}
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* {post?.relatedPosts.map(relatedPost => (
                  <a key={relatedPost?.id} href={`/blog/${relatedPost?.id}`} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 group-hover:shadow-lg">
                      <img 
                        src={relatedPost?.image} 
                        alt={relatedPost?.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition duration-300">{relatedPost?.title}</h4>
                      </div>
                    </div>
                  </a>
                ))} */}
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

    </div>
    {/* <Footer /> */}
  </>

  );
}