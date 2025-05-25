import React, { useState } from 'react';
import { User, Mail, Lock, Shield, Image, FileText, X, Check, Eye, EyeOff, Plus } from 'lucide-react';

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    profileImage: string;
    bio: string;
}

interface UserCreateFormProps {
    isOpen: boolean;
    onSubmit: (userData: UserFormData) => void;
    onCancel: () => void;
    title?: string;
    submitText?: string;
    cancelText?: string;
}
const CreateUser: React.FC<UserCreateFormProps> = ({
    isOpen,
    onSubmit,
    onCancel,
    title = "Add New User",
    submitText = "Add User",
    cancelText = "Cancel"
}) => {
    const [formData, setFormData] = useState<UserFormData>({
        name: '',
        email: '',
        password: '',
        isAdmin: false,
        profileImage: '',
        bio: ''
    });

    const [errors, setErrors] = useState<Partial<UserFormData>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');


    if (!isOpen) return null;


    const validateForm = (): boolean => {
        const newErrors: Partial<UserFormData> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.bio.length > 500) {
            newErrors.bio = 'Bio must be less than 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(formData);
            // Reset form
            setFormData({
                name: '',
                email: '',
                password: '',
                isAdmin: false,
                profileImage: '',
                bio: ''
            });
            setImagePreview('');
            setErrors({});
        }
    };

    const handleInputChange = (field: keyof UserFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    // const handleImageFileChange = (file: File) => {
    //     // handleInputChange('profileImage', url);
    //     // setImagePreview(url);
    // };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };



    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={handleBackdropClick}
        >
            <div
                className="relative w-full max-w-2xl rounded-lg shadow-2xl"
                style={{ backgroundColor: '#14152b' }}
            >
                {/* Header */}
                <div
                    className="sticky top-0 px-6 py-4 border-b flex items-center justify-between rounded-t-lg"
                    style={{
                        backgroundColor: '#21273c',
                        borderBottomColor: '#3a4a68'
                    }}
                >
                    <div className="flex items-center space-x-3 z-100">
                        <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: '#14152b' }}
                        >
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

                {/* Form Content */}
                <div className="p-6 overflow-auto" style={{ maxHeight: `calc(90vh)` }}>
                    {/* Profile Image Section */}
                    <div className="text-center">
                        <div className="inline-block relative">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    className="w-20 h-20 rounded-full object-cover border-2"
                                    style={{ borderColor: '#21273c' }}
                                    onError={() => setImagePreview('')}
                                />
                            ) : (
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center border-2"
                                    style={{
                                        backgroundColor: '#21273c',
                                        borderColor: '#3a4a68'
                                    }}
                                >
                                    <User className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name *
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.name
                                        ? 'border-red-500 bg-red-900 bg-opacity-20 focus:ring-red-500'
                                        : 'border-gray-600 focus:ring-blue-500'
                                        }`}
                                    style={{
                                        backgroundColor: errors.name ? undefined : '#21273c'
                                    }}
                                    placeholder="Enter full name"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                    <X size={14} />
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address *
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email
                                        ? 'border-red-500 bg-red-900 bg-opacity-20 focus:ring-red-500'
                                        : 'border-gray-600 focus:ring-blue-500'
                                        }`}
                                    style={{
                                        backgroundColor: errors.email ? undefined : '#21273c'
                                    }}
                                    placeholder="user@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                    <X size={14} />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.password
                                        ? 'border-red-500 bg-red-900 bg-opacity-20 focus:ring-red-500'
                                        : 'border-gray-600 focus:ring-blue-500'
                                        }`}
                                    style={{
                                        backgroundColor: errors.password ? undefined : '#21273c'
                                    }}
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                    <X size={14} />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Profile Image URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Profile Image URL
                            </label>
                            <div className="relative">
                                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="file"
                                    value={formData.profileImage}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            console.log("Selected file:", file);

                                            // setFormData((prev) => ({
                                            //     ...prev,
                                            //     profileImage: file,
                                            // }));
                                        }
                                    }} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-600 transition-all duration-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    style={{ backgroundColor: '#21273c' }}
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>
                        </div>

                        {/* Bio Field */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Biographical Info
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    rows={4}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 resize-none ${errors.bio
                                        ? 'border-red-500 bg-red-900 bg-opacity-20 focus:ring-red-500'
                                        : 'border-gray-600 focus:ring-blue-500'
                                        }`}
                                    style={{
                                        backgroundColor: errors.bio ? undefined : '#21273c'
                                    }}
                                    placeholder="Share a little biographical information to fill out your profile..."
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                {errors.bio ? (
                                    <p className="text-sm text-red-400 flex items-center gap-1">
                                        <X size={14} />
                                        {errors.bio}
                                    </p>
                                ) : (
                                    <div />
                                )}
                                <p className="text-sm text-gray-400">
                                    {formData.bio.length}/500
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Toggle */}
                    <div
                        className="p-4 rounded-lg border"
                        style={{
                            backgroundColor: '#21273c',
                            borderColor: '#3a4a68'
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div
                                    className="p-2 rounded-lg"
                                    style={{ backgroundColor: '#14152b' }}
                                >
                                    <Shield className="text-blue-400" size={18} />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Administrator</p>
                                    <p className="text-sm text-gray-400">Grant this user administrator privileges</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isAdmin}
                                    onChange={(e) => handleInputChange('isAdmin', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 text-gray-300 border border-gray-600 hover:border-gray-500 hover:bg-gray-700 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="flex-1 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Check size={16} />
                            {submitText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;