import React, { useState } from "react";
import {
    User,
    Mail,
    Lock,
    Shield,
    Image,
    FileText,
    X,
    Check,
    Eye,
    EyeOff,
    Plus,
} from "lucide-react";
import axios from "axios";

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    isAdmin: boolean;
    profileImage?: File | null;
    bio: string;
}

interface UserCreateFormProps {
    isOpen: boolean;
    onSuccess?: () => void;
    onCancel: () => void;
    title?: string;
    submitText?: string;
    cancelText?: string;
}

const CreateUser: React.FC<UserCreateFormProps> = ({
    isOpen,
    onSuccess,
    onCancel,
    title = "Add New User",
    submitText = "Add User",
    cancelText = "Cancel",
}) => {
    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        isAdmin: false,
        profileImage: null,
        bio: "",
    });

    const [errors, setErrors] = useState<Partial<UserFormData>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const validateForm = (): boolean => {
        const newErrors: Partial<UserFormData> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirm_password)
            newErrors.confirm_password = "Passwords do not match";

        if (formData.bio.length > 500)
            newErrors.bio = "Bio must be less than 500 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            const form = new FormData();
            form.append("name", formData.name);
            form.append("email", formData.email);
            form.append("password", formData.password);
            form.append("confirm_password", formData.confirm_password);
            form.append("isAdmin", String(formData.isAdmin));
            form.append("bio", formData.bio);
            if (formData.profileImage) {
                form.append("profileImage", formData.profileImage);
            }

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`, form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (onSuccess) onSuccess();
            onCancel();
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Error creating user");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (
        field: keyof UserFormData,
        value: string | boolean | File | null
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleImageFileChange = (file: File) => {
        handleInputChange("profileImage", file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
            onClick={(e) => e.target === e.currentTarget && onCancel()}
        >
            <div className="relative w-full max-w-2xl rounded-lg shadow-2xl bg-[#14152b]">
                {/* Header */}
                <div className="sticky top-0 px-6 py-4 border-b flex items-center justify-between rounded-t-lg bg-[#21273c] border-[#3a4a68]">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-[#14152b]">
                            <Plus className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-white">{title}</h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 overflow-auto max-h-[90vh]">
                    {/* Profile Image */}
                    <div className="text-center mb-6">
                        <div className="inline-block relative">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    className="w-20 h-20 rounded-full object-cover border-2 border-[#21273c]"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-[#3a4a68] bg-[#21273c]">
                                    <User className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#21273c] text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter full name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-400 mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#21273c] text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="user@example.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-400 mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password + Confirm Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-600 bg-[#21273c] text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-400 mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password *
                            </label>
                            <input
                                type="password"
                                value={formData.confirm_password}
                                onChange={(e) =>
                                    handleInputChange("confirm_password", e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#21273c] text-white focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm password"
                            />
                            {errors.confirm_password && (
                                <p className="text-sm text-red-400 mt-1">
                                    {errors.confirm_password}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Profile Image Upload */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                e.target.files?.[0] && handleImageFileChange(e.target.files[0])
                            }
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#21273c] text-white focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Bio */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Biographical Info
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#21273c] text-white focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Write something about user..."
                        />
                        <p className="text-sm text-gray-400 mt-1">
                            {formData.bio.length}/500
                        </p>
                        {errors.bio && (
                            <p className="text-sm text-red-400 mt-1">{errors.bio}</p>
                        )}
                    </div>

                    {/* Admin Toggle */}
                    <div className="mt-6 p-4 rounded-lg border bg-[#21273c] border-[#3a4a68] flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Shield className="text-blue-400" size={18} />
                            <div>
                                <p className="font-medium text-white">Administrator</p>
                                <p className="text-sm text-gray-400">
                                    Grant this user administrator privileges
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isAdmin}
                                onChange={(e) => handleInputChange("isAdmin", e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 text-gray-300 border border-gray-600 hover:bg-gray-700 rounded-lg font-medium"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                            {loading ? "Saving..." : <Check size={16} />}
                            {loading ? "" : submitText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
