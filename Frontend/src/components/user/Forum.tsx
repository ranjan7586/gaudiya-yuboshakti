import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import Footer from './Footer';
// import Header from './Header';
interface ForumAppProps {
    mode: "home" | "page";
}

interface Forum {
    _id: number;
    title: string;
    description: string;
    author: any;
    date: string;
    tags: any;
    readTime: string;
    thumbnail_img: string;
    deletedAt: Date;
}

// const forumsData: Forum[] = [
//     {
//         id: 1,
//         title: "Yerevan Dialogue",
//         shortDescription: "The Yerevan Dialogue aims to serve a platform bringing together policymakers, academics, civil society, and the private sector to deliberate and...",
//         fullDescription: "The Yerevan Dialogue aims to serve a platform bringing together policymakers, academics, civil society, and the private sector to deliberate and discuss the most pressing challenges facing Armenia and the broader region. This annual conference focuses on economic development, democratic governance, and regional cooperation. Participants engage in high-level discussions about sustainable development, innovation policies, and strategic partnerships that can drive positive change in the South Caucasus region.",
//         image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop&crop=center",
//         date: "May 26-27, 2025",
//         location: "Yerevan, Armenia",
//         participants: "200+ Leaders",
//         category: "Policy & Governance"
//     },
//     {
//         id: 2,
//         title: "Innovation Island Summit",
//         shortDescription: "Innovation Island Summit is a multistakeholder, cross-discipline platform that explores strategies for advancing sustainable, innovative pathways for Sri...",
//         fullDescription: "Innovation Island Summit is a multistakeholder, cross-discipline platform that explores strategies for advancing sustainable, innovative pathways for Sri Lanka's development. The summit brings together entrepreneurs, technologists, policymakers, and investors to discuss emerging technologies, startup ecosystems, and digital transformation initiatives. Key focus areas include fintech innovation, sustainable agriculture technology, renewable energy solutions, and digital governance frameworks.",
//         image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop&crop=center",
//         date: "August 15-16, 2025",
//         location: "Colombo, Sri Lanka",
//         participants: "300+ Innovators",
//         category: "Technology & Innovation"
//     },
//     {
//         id: 3,
//         title: "Sagarmanthan: The Great Oceans Dialogue",
//         shortDescription: "The 2025 edition of Sagarmanthan: The Great Oceans Dialogue will be held during MoP&SW's biennial India Maritime Week (October 27-31, 2025...",
//         fullDescription: "The 2025 edition of Sagarmanthan: The Great Oceans Dialogue will be held during MoP&SW's biennial India Maritime Week (October 27-31, 2025). This premier maritime conference addresses critical ocean governance, marine conservation, and sustainable blue economy initiatives. The dialogue focuses on maritime security, ocean sustainability, shipping innovations, and coastal development strategies. International maritime experts, policymakers, and industry leaders collaborate on solutions for ocean conservation and maritime trade enhancement.",
//         image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop&crop=center",
//         date: "October 27-31, 2025",
//         location: "Mumbai, India",
//         participants: "500+ Maritime Experts",
//         category: "Maritime & Oceans"
//     },
//     {
//         id: 4,
//         title: "Budapest Global Dialogue",
//         shortDescription: "To promote international dialogue and strategic thinking, the Budapest Global Dialogue was established as a new and significant forum for...",
//         fullDescription: "To promote international dialogue and strategic thinking, the Budapest Global Dialogue was established as a new and significant forum for discussing global challenges and opportunities. This high-level conference brings together world leaders, diplomats, academics, and business executives to address geopolitical trends, economic cooperation, and multilateral governance. The dialogue emphasizes Central European perspectives on global affairs, EU integration, transatlantic relations, and emerging market dynamics.",
//         image: "https://images.unsplash.com/photo-1520637836862-4d197d17c9a4?w=400&h=200&fit=crop&crop=center",
//         date: "June 12-14, 2025",
//         location: "Budapest, Hungary",
//         participants: "250+ Global Leaders",
//         category: "International Relations"
//     },
//     {
//         id: 5,
//         title: "Raisina Dialogue",
//         shortDescription: "The Raisina Dialogue is India's premier conference on geopolitics and geoeconomics committed to addressing the most challenging issues facing the...",
//         fullDescription: "The Raisina Dialogue is India's premier conference on geopolitics and geoeconomics committed to addressing the most challenging issues facing the world today. Named after Raisina Hill in New Delhi, this flagship event brings together leaders from politics, business, media, and academia to discuss global governance, security challenges, and economic cooperation. The dialogue covers topics ranging from cyber security and climate change to trade relations and regional stability in the Indo-Pacific region.",
//         image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=200&fit=crop&crop=center",
//         date: "March 5-8, 2025",
//         location: "New Delhi, India",
//         participants: "400+ Global Thinkers",
//         category: "Geopolitics"
//     },
//     {
//         id: 6,
//         title: "Cape Town Conversation",
//         shortDescription: "Cape Town Conversations will serve as an annual South Africa-based platform that brings together key stakeholders and new voices. It is designed as...",
//         fullDescription: "Cape Town Conversations will serve as an annual South Africa-based platform that brings together key stakeholders and new voices. It is designed as a multi-day conference focusing on African development, social innovation, and continental integration. The platform emphasizes youth leadership, entrepreneurship, sustainable development goals, and pan-African collaboration. Discussions cover topics such as digital transformation in Africa, renewable energy initiatives, education reform, and economic empowerment strategies across the continent.",
//         image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=200&fit=crop&crop=center",
//         date: "September 20-22, 2025",
//         location: "Cape Town, South Africa",
//         participants: "350+ African Leaders",
//         category: "African Development"
//     }
// ];


const ForumApp: React.FC<ForumAppProps> = ({ mode }) => {
    const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
    // const [visibleCount, setVisibleCount] = useState(6);
    const [forumsData, setForumsData] = useState<Forum[]>([]);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search] = useState("");

    const displayPerPage = mode === "home" ? 6 : 9;


    const handleForumClick = (forum: Forum) => {
        setSelectedForum(forum);
    };

    const handleBackClick = () => {
        setSelectedForum(null);
    };

    // const loadMore = () => {
    //     setVisibleCount(prev => Math.min(prev + 6, forumsData.length));
    // };


    const fetchForums = async (reset = false) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/forums/list`, {
                page,
                display_per_page: displayPerPage,
                sort_by: "date",
                sort_order: "desc",
                search
            });
            if (reset) {
                console.log("enter if")
                setForumsData(data.data);
            } else {
                console.log("enter else")
                setForumsData(prev => [...prev, ...data.data]);
                console.log(forumsData)
            }
            setTotal(data.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchForums(true);
    }, [search]);

    const loadMore = () => {
        if (forumsData.length < total) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (page > 1) fetchForums();
    }, [page]);


    if (selectedForum) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <button
                        onClick={handleBackClick}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Forums</span>
                    </button>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="h-64 md:h-80 overflow-hidden">
                            <img
                                src={selectedForum.thumbnail_img}
                                alt={selectedForum.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                    {selectedForum.tags}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {selectedForum.title}
                            </h1>

                            <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-blue-600" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-600">Date</p>
                                        <p className="font-medium">{selectedForum.date}</p>
                                    </div>
                                </div>
                                {/* <div className="flex items-center gap-2">
                                    <MapPin className="text-blue-600" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-600">Location</p>
                                        <p className="font-medium">{selectedForum.location}</p>
                                    </div>
                                </div> */}
                                {/* <div className="flex items-center gap-2">
                                    <Users className="text-blue-600" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-600">Participants</p>
                                        <p className="font-medium">{selectedForum.participants}</p>
                                    </div>
                                </div> */}
                            </div>

                            <div className="prose max-w-none">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900">About This Forum</h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {selectedForum.description.substring(0, 200)}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    Register Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* {mode === 'page' &&
                <Header />
            } */}
            <div className={`mb-20 bg-gray-50`}>
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Forums</h1>
                        <div className="w-20 h-1 bg-yellow-400"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {forumsData && forumsData.map((forum) => (
                            <div
                                key={forum._id}
                                onClick={() => handleForumClick(forum)}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                            >
                                <div className="flex gap-4 p-6">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={forum.thumbnail_img}
                                            alt={forum.title}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                                            {forum.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: forum.description.substring(0, 200) || '' }} />
                                        <div className="mt-3">
                                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                {forum.tags}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {mode === "home" ? (
                        <div className="text-center mt-12">
                            <Link
                                to="/forum"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                            >
                                VIEW ALL
                            </Link>
                        </div>
                    ) : (
                        forumsData.length < total && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={loadMore}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                                >
                                    LOAD MORE
                                </button>
                            </div>
                        )
                    )}

                </div>
            </div>
            {/* {mode === 'page' &&
                <Footer />
            } */}
        </>

    );
};

export default ForumApp;