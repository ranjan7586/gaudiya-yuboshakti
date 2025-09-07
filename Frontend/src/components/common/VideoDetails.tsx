import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Video {
    _id: string;
    title: string;
    description: string;
    youtubeUrl: string;
    categories: { _id: string; name: string }[];
    date: string;
}

const VideoDetails: React.FC = () => {
    const { id } = useParams();
    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/details/${id}`
                );
                setVideo(data.data);
            } catch (error) {
                console.error("Error fetching video:", error);
            }
        };

        fetchVideo();
    }, [id]);

    if (!video) return <p className="text-center py-20">Loading...</p>;

    return (
        <div className={`container mx-auto px-4 py-12`}>
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{video.title}</h1>

            {/* Video Embed */}
            <div className="aspect-w-16 aspect-h-9 mb-6">
                <iframe
                    src={video.youtubeUrl}
                    title={video.title}
                    allowFullScreen
                    className="w-full h-[480px] rounded-lg shadow-md"
                ></iframe>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {video.description}
            </p>

            {/* Categories */}
            {video.categories?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {video.categories.map((cat) => (
                        <span
                            key={cat._id}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VideoDetails;
