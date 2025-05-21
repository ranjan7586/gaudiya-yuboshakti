import { useState } from 'react';
import { Mail, Facebook, Twitter, Linkedin, Share2, ArrowUp } from 'lucide-react';

const FeaturedVideos: React.FC = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // Sample video data
    const videos = [
        {
            id: 1,
            title: 'From Delhi to the North Pole: Asia\'s Arctic Strategy Explained',
            thumbnail: '/api/placeholder/480/270',
            src:'https://www.youtube.com/embed/IDWimszNZB4?si=YoW6KhhayOlYuesx',
            category: 'Geopolitics',
            date: 'May 09, 2025'
        },
        {
            id: 2,
            title: 'भारत-पाकिस्तान विशेष!',
            thumbnail: '/api/placeholder/480/270',
            src:'https://www.youtube.com/embed/zZJFozFsnIU?si=v6I_Snf655Q_aTwj',
            category: 'Neighbourhood',
            date: 'May 09, 2025'
        },
        {
            id: 3,
            title: 'Is the Arctic the Final Frontier for the Space Economy?',
            thumbnail: '/api/placeholder/480/270',
            src:'https://www.youtube.com/embed/qRdHKmj4-iE?si=KIT46PU8TJJNcruW',
            category: 'Science & Strategy',
            date: 'May 09, 2025'
        },
        {
            id: 4,
            title: 'Geopolitics, Ice & Innovation: The Arctic\'s Global Future Begins in India',
            thumbnail: '/api/placeholder/480/270',
            src:'https://youtube.com/embed/h_fdPgjp4bI?si=Pyb9xcJYH_ShPhqP',
            category: 'Global Affairs',
            date: 'May 08, 2025'
        },
        {
            id: 5,
            title: 'Arctic Vision from the Indian Parliament',
            thumbnail: '/api/placeholder/480/270',
            src:'https://youtube.com/embed/7EoUwVVTLE4?si=DDsywDzBzR5d1JgL',
            category: 'Politics',
            date: 'May 08, 2025'
        },
        {
            id: 6,
            title: 'Partners not Preachers: Dr. S Jaishankar on EU',
            thumbnail: '/api/placeholder/480/270',
            src:'https://youtube.com/embed/XmGO4O2vpJw?si=PLdyeEmIFk8QmH2w',
            category: 'Diplomacy',
            date: 'May 06, 2025'
        }
    ];

    // Handle scroll event to show/hide the scroll-to-top button
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };

    // Add scroll event listener
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
    }

    // Function to scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Latest Videos</h1>
                <div className="w-24 h-1 bg-yellow-400 mb-8"></div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {videos.map((video) => (
                        <div key={video.id} className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            {/* Video Thumbnail with Play Button */}
                            <div className="relative">
                                {/* <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-48 object-cover"
                                /> */}
                                <iframe className='w-full h-48' src={video.src}></iframe>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="bg-white bg-opacity-80 rounded-full p-8 hover:bg-opacity-100 transition duration-300">
                                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-blue-600 border-b-8 border-b-transparent ml-1"></div>
                                    </button>
                                </div>
                                {video.category && (
                                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        {video.category}
                                    </span>
                                )}
                            </div>

                            {/* Video Details */}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-blue-600 transition duration-300">
                                    {video.title}
                                </h2>

                                {/* Social Share Icons and Date */}
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-gray-600 hover:text-blue-600 transition duration-300">
                                            <Mail size={16} />
                                        </button>
                                        <button className="text-gray-600 hover:text-blue-600 transition duration-300">
                                            <Facebook size={16} />
                                        </button>
                                        <button className="text-gray-600 hover:text-blue-600 transition duration-300">
                                            <Twitter size={16} />
                                        </button>
                                        <button className="text-gray-600 hover:text-blue-600 transition duration-300">
                                            <Linkedin size={16} />
                                        </button>
                                        <button className="text-gray-600 hover:text-blue-600 transition duration-300">
                                            <Share2 size={16} />
                                        </button>
                                    </div>
                                    <span className="text-xs text-gray-500">{video.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-50"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </div>
    );
};

export default FeaturedVideos;