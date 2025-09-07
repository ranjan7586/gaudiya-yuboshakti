import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axiosAuth from "../../config/axios_auth";
import { Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import DeleteConfirmPopup from "../common/DeleteConfirmPopup";

interface Video {
  _id: string;
  title: string;
  youtubeUrl: string;
  categories: { _id: string; name: string }[];
  tags: { _id: string; name: string }[];
  date: string;
}

const VideosContent = () => {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const fetchVideos = async () => {
    try {
      const { data } = await axiosAuth.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/list`,
        { page: 1, limit: 10 }
      );
      if (data?.data) setVideos(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axiosAuth.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/delete/${selectedVideo?._id}`
      );
      toast.success(data.message);
      setIsDeletePopupOpen(false);
      setSelectedVideo(null);
      fetchVideos();
    } catch (error) {
      toast.error("Error deleting video");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Videos</h1>
          <p className="text-gray-500">Manage your video library</p>
        </div>
        <NavLink to={"/admin/videos/add-video"}>
          <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            <Plus size={18} />
            <span>Add New</span>
          </button>
        </NavLink>
      </div>

      <div className="bg-gray-800 bg-opacity-5 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
          <div className="col-span-4">Title</div>
          <div className="col-span-3">YouTube URL</div>
          <div className="col-span-2">Categories</div>
          <div className="col-span-2">Tags</div>
          <div className="col-span-1">Date</div>
        </div>

        {videos.map((video) => (
          <div
            key={video._id}
            className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="col-span-4 flex items-center">
              <div className="flex-1">
                <div className="font-medium">{video.title}</div>
                <div className="flex space-x-3 mt-1">
                  <NavLink
                    to={`/admin/videos/update-video/${video._id}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </NavLink>
                  <button
                    className="text-red-600 text-sm hover:underline cursor-pointer"
                    onClick={() => {
                      setIsDeletePopupOpen(true);
                      setSelectedVideo(video);
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`/videos/details/${video._id}`}>
                    <button className="text-gray-600 text-sm hover:underline cursor-pointer">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-3 truncate">{video.youtubeUrl}</div>
            <div className="col-span-2">
              {video.categories?.map((c) => c.name).join(", ")}
            </div>
            <div className="col-span-2">
              {video.tags?.map((t) => t.name).join(", ")}
            </div>
            <div className="col-span-1">{video.date}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">Showing 1–{videos.length} videos</div>
        <div className="flex space-x-2">
          <button className="p-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft size={16} />
          </button>
          <button className="p-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <DeleteConfirmPopup
        isOpen={isDeletePopupOpen}
        onConfirm={handleDelete}
        onCancel={() => {
          setIsDeletePopupOpen(false);
          setSelectedVideo(null);
        }}
        itemName={selectedVideo?.title || undefined}
      />
    </div>
  );
};

export default VideosContent;
