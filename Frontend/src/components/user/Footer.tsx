// import React from 'react'

type Props = {}

function Footer({ }: Props) {
    return (
        <div>
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
    )
}

export default Footer