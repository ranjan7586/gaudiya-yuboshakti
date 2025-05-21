import React, { useState } from 'react';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Github,
    Mail,
    Globe,
    Phone
} from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        message: '',
        isError: false,
        isSubmitted: false
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Form validation
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus({
                message: 'Please fill all required fields',
                isError: true,
                isSubmitted: false
            });
            return;
        }

        // In a real app, you'd send the form data to your backend here
        console.log('Form submitted:', formData);

        // Simulate successful submission
        setFormStatus({
            message: 'Thank you for your message! We will get back to you soon.',
            isError: false,
            isSubmitted: true
        });

        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    // Social media data with icons and links
    const socialMedia = [
        { name: 'Facebook', icon: <Facebook className="w-6 h-6" />, color: 'bg-blue-600' },
        { name: 'Twitter', icon: <Twitter className="w-6 h-6" />, color: 'bg-blue-400' },
        { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, color: 'bg-pink-600' },
        { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6" />, color: 'bg-blue-800' },
        { name: 'YouTube', icon: <Youtube className="w-6 h-6" />, color: 'bg-red-600' },
        { name: 'GitHub', icon: <Github className="w-6 h-6" />, color: 'bg-gray-800' },
        { name: 'Email', icon: <Mail className="w-6 h-6" />, color: 'bg-green-600' },
        { name: 'Website', icon: <Globe className="w-6 h-6" />, color: 'bg-purple-600' },
        { name: 'Phone', icon: <Phone className="w-6 h-6" />, color: 'bg-yellow-600' }
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        We'd love to hear from you! Reach out through the form or connect with us on social media.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Social Media Section */}
                    <div className="w-full lg:w-2/5">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Connect With Us</h3>

                            <div className="grid grid-cols-3 gap-4">
                                {socialMedia.map((social, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className={`${social.color} text-white rounded-lg p-4 flex flex-col items-center justify-center transition-transform hover:scale-105 hover:shadow-md`}
                                    >
                                        {social.icon}
                                        <span className="mt-2 text-xs font-medium">{social.name}</span>
                                    </a>
                                ))}
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-indigo-600 mr-3" />
                                    <span className="text-gray-700">contact@example.com</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-indigo-600 mr-3" />
                                    <span className="text-gray-700">+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center">
                                    <Globe className="w-5 h-5 text-indigo-600 mr-3" />
                                    <span className="text-gray-700">www.example.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full lg:w-3/5">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>

                            {formStatus.isSubmitted ? (
                                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                                    {formStatus.message}
                                </div>
                            ) : formStatus.message ? (
                                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                                    {formStatus.message}
                                </div>
                            ) : null}

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                        Your Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                        Your Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;