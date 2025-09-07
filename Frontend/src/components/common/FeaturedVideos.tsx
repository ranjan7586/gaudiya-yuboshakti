import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

interface Video {
    _id: string;
    title: string;
    description: string;
    youtubeUrl: string;
    categories: { _id: string; name: string }[];
    date: string;
}

interface FeaturedVideosProps {
    mode: "home" | "page";
}

const FeaturedVideos: React.FC<FeaturedVideosProps> = ({ mode }) => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const displayPerPage = mode === "home" ? 6 : 9;

    const fetchVideos = async (reset = false) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/list`,
                {
                    page,
                    display_per_page: displayPerPage,
                    sort_by: "createdAt",
                    sort_order: "desc",
                }
            );

            if (reset) {
                setVideos(data.data);
            } else {
                setVideos((prev) => [...prev, ...data.data]);
            }

            setTotal(data.total || 0);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    useEffect(() => {
        fetchVideos(true);
    }, []);

    useEffect(() => {
        if (page > 1) fetchVideos();
    }, [page]);

    // scroll-to-top
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const loadMore = () => {
        if (videos.length < total) {
            setPage((prev) => prev + 1);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={`min-h-screen bg-gray-50`}>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Featured Videos</h1>
                <div className="w-24 h-1 bg-yellow-400 mb-8"></div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {(mode === "home" ? videos.slice(0, 6) : videos).map((video) => (
                        <Link
                            key={video._id}
                            to={`/videos/${video._id}`}
                            className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                        >
                            <div className="relative">
                                <iframe
                                    className="w-full h-48"
                                    src={video.youtubeUrl}
                                    title={video.title}
                                    allowFullScreen
                                ></iframe>
                                {video.categories?.length > 0 && (
                                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        {video.categories.map((c) => c.name).join(", ")}
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-blue-600 transition duration-300">
                                    {video.title}
                                </h2>
                                <span className="text-xs text-gray-500">
                                    {new Date(video.date).toLocaleDateString()}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load More for listing page */}
                {mode === "page" && videos.length < total && (
                    <div className="text-center">
                        <button
                            onClick={loadMore}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                        >
                            Load More
                        </button>
                    </div>
                )}

                {/* View All for home */}
                {mode === "home" && (
                    <div className="text-center">
                        <Link
                            to="/videos"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                        >
                            VIEW ALL
                        </Link>
                    </div>
                )}
            </div>

            {/* Scroll to Top */}
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
