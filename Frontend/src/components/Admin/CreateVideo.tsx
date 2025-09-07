import { toast } from "react-toastify";
import axiosAuth from "../../config/axios_auth";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Tag = { _id: string; name: string; slug: string };

interface CreateVideoProps {
    is_update?: boolean;
}

// Category type
type Category = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    parent?: {
        _id: string;
        name: string;
        slug: string;
    };
};

const CreateVideo: React.FC<CreateVideoProps> = ({ is_update = false }) => {
    const [updateId, setUpdateId] = useState<string | undefined>(undefined);
    const [embedUrl, setEmbedUrl] = useState<string>("");
    const [formData, setFormData] = useState<{
        title: string;
        youtubeUrl: string;
        description: string;
        categories: string[];
        tags: string[];
        date: string;
    }>({
        title: "",
        youtubeUrl: "",
        description: "",
        categories: [],
        tags: [],
        date: "",
    });


    // render tree function
    const renderCategoryTree = (
        categoryList: Category[],
        parentId: string | undefined = undefined,
        depth: number = 0,
        selectedCategories: string[],
        handleCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    ) => {
        return categoryList
            .filter(cat => (cat.parent?._id ?? undefined) === parentId)
            .map(category => (
                <div key={category._id} className="relative group">
                    <label
                        className="inline-flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                        style={{ paddingLeft: `${16 + depth * 20}px` }}
                    >
                        <input
                            type="checkbox"
                            name="categories"
                            value={category._id}
                            checked={selectedCategories.includes(category._id)}
                            onChange={handleCategoryChange}
                            className="form-checkbox h-4 w-4 text-blue-600 rounded-md"
                        />
                        <span className="text-gray-700">{category.name}</span>
                    </label>
                    {/* Recursively render children */}
                    {renderCategoryTree(
                        categoryList,
                        category._id,
                        depth + 1,
                        selectedCategories,
                        handleCategoryChange
                    )}
                </div>
            ));
    };



    const { id } = useParams<{ id: string }>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setUpdateId(id);
        if (is_update && id) {
            const fetchVideo = async () => {
                try {
                    const { data } = await axiosAuth.get(
                        `${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/details/${id}`
                    );
                    setFormData({
                        title: data.data.title,
                        youtubeUrl: data.data.youtubeUrl,
                        description: data.data.description,
                        categories: data.data.categories.map((c: { _id: string }) => c._id),
                        tags: data.data.tags.map((t: { _id: string }) => t._id),
                        date: data.data.date,
                    });
                } catch (error) {
                    console.error("Failed to fetch video:", error);
                }
            };
            fetchVideo();
        }
    }, [is_update, id]);

    // update embedUrl whenever youtubeUrl changes
    useEffect(() => {
        if (formData.youtubeUrl) {
            const videoId = extractYouTubeId(formData.youtubeUrl);
            setEmbedUrl(videoId ? `https://www.youtube.com/embed/${videoId}` : "");
        } else {
            setEmbedUrl("");
        }
    }, [formData.youtubeUrl]);

    const fetchCategories = async () => {
        try {
            const { data } = await axiosAuth.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/list`
            );
            if (data.data) setCategories(data.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };
    const fetchTags = async () => {
        try {
            const { data } = await axiosAuth.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/tags/list`
            );
            if (data.data) setTags(data.data);
        } catch (error) {
            console.error("Failed to fetch tags:", error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            categories: checked
                ? [...prev.categories, value]
                : prev.categories.filter((c) => c !== value),
        }));
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            tags: checked
                ? [...prev.tags, value]
                : prev.tags.filter((t) => t !== value),
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (is_update && updateId) {
                const { data } = await axiosAuth.patch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/update/${updateId}`,
                    formData
                );
                toast.success(data.message);
                navigate("/admin/videos");
            } else {
                const { data } = await axiosAuth.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/create`,
                    formData
                );
                toast.success(data.message);
                setFormData({
                    title: "",
                    youtubeUrl: "",
                    description: "",
                    categories: [],
                    tags: [],
                    date: "",
                });
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };
    // helper stays the same but safer
    const extractYouTubeId = (url: string): string => {
        try {
            const urlObj = new URL(url);

            if (urlObj.hostname === "youtu.be") {
                return urlObj.pathname.slice(1);
            } else if (urlObj.hostname.includes("youtube.com")) {
                return urlObj.searchParams.get("v") || urlObj.pathname.split("/")[2] || "";
            }

            return "";
        } catch {
            return "";
        }
    };



    useEffect(() => {
        fetchCategories();
        fetchTags();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <div className="form_content p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {is_update ? "Update Video" : "Add New Video"}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/3 flex flex-col space-y-6">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-xl border-0 focus:ring-0 focus:outline-none font-bold"
                                placeholder="Enter video title"
                                required
                            />
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6">
                            <label className="block text-gray-700 font-medium mb-2">
                                YouTube URL
                            </label>
                            <input
                                type="url"
                                id="youtubeUrl"
                                name="youtubeUrl"
                                value={formData.youtubeUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://youtube.com/watch?v=..."
                                required
                            />

                            {/* Preview Section */}
                            {embedUrl && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-600 mb-2">Preview</h4>
                                    <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            src={embedUrl}
                                            title="YouTube preview"
                                            className="w-full h-64 rounded-md"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                        </div>


                        <div className="bg-white shadow-md rounded-lg flex-1 p-6">
                            <label className="block text-gray-700 font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write description..."
                            />
                        </div>
                    </div>

                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="font-medium text-gray-700">Publish</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                <div>
                                    <label
                                        htmlFor="date"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-6 py-2 rounded-md text-white font-medium ${isSubmitting
                                        ? "bg-blue-400"
                                        : "bg-blue-600 hover:bg-blue-700"
                                        } transition-all`}
                                >
                                    {isSubmitting
                                        ? is_update
                                            ? "Updating..."
                                            : "Publishing..."
                                        : is_update
                                            ? "Update Video"
                                            : "Publish Video"}
                                </button>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="font-medium text-gray-700">Categories</h3>
                            </div>
                            <div className="p-4 h-60 overflow-y-auto custom-scrollbar">
                                {categories.length > 0 ? (
                                    renderCategoryTree(
                                        categories,
                                        undefined,
                                        0,
                                        formData.categories,  // <- your selected categories state
                                        handleCategoryChange  // <- same handler you use in blog
                                    )
                                ) : (
                                    <p className="text-center text-gray-500">No categories found.</p>
                                )}
                            </div>
                        </div>


                        {/* Tags */}
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="font-medium text-gray-700">Tags</h3>
                            </div>
                            <div className="p-4 space-y-2">
                                {tags.length > 0 ? (
                                    tags.map((tag) => (
                                        <label
                                            key={tag._id}
                                            className="inline-flex items-center space-x-2"
                                        >
                                            <input
                                                type="checkbox"
                                                name="tags"
                                                value={tag._id}
                                                checked={formData.tags.includes(tag._id)}
                                                onChange={handleTagChange}
                                                className="form-checkbox mx-2 h-4 w-4 text-blue-600"
                                            />
                                            <span className="text-gray-700">{tag.name}</span>
                                        </label>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No tags found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateVideo;
