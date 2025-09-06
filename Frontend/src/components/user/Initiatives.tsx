import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  initiative: string;
}

interface Initiative {
  id: number;
  name: string;
  slug: string;
}

const initiativesData: Initiative[] = [
  { id: 1, name: "Adaptation and Resilience", slug: "adaptation-resilience" },
  { id: 2, name: "Climate Change and Development", slug: "climate-development" },
  { id: 3, name: "Energy and Climate Change", slug: "energy-climate" },
  { id: 4, name: "Eurasian Studies", slug: "eurasian-studies" },
  { id: 5, name: "Green Transitions", slug: "green-transitions" },
  { id: 6, name: "International Trade and Finance", slug: "trade-finance" },
  { id: 7, name: "Digital Governance", slug: "digital-governance" },
  { id: 8, name: "Maritime Security", slug: "maritime-security" },
  { id: 9, name: "Cyber Security", slug: "cyber-security" },
  { id: 10, name: "Space Policy", slug: "space-policy" },
  { id: 11, name: "Urban Development", slug: "urban-development" },
  { id: 12, name: "Health Security", slug: "health-security" },
  { id: 13, name: "Food Security", slug: "food-security" },
  { id: 14, name: "Technology Innovation", slug: "tech-innovation" },
  { id: 15, name: "Financial Inclusion", slug: "financial-inclusion" }
];

const blogPostsData: BlogPost[] = [
  {
    id: 1,
    title: "Shusha Declaration: The Turkic states chart a course for cooperation",
    category: "International Affairs",
    date: "Jul 15, 2024",
    author: "AKLAZ WANI",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=250&fit=crop&crop=center",
    initiative: "eurasian-studies"
  },
  {
    id: 2,
    title: "Russia, North Korea and the East Asian Security Order",
    category: "International Affairs",
    date: "Jul 08, 2024",
    author: "ABHISHEK SHARMA | RAJOLI SIDDHARTH JAYAPRAKASH",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=250&fit=crop&crop=center",
    initiative: "eurasian-studies"
  },
  {
    id: 3,
    title: "Climate Adaptation Strategies for Vulnerable Communities",
    category: "Climate Policy",
    date: "Jul 12, 2024",
    author: "SARAH CHEN",
    image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=250&fit=crop&crop=center",
    initiative: "adaptation-resilience"
  },
  {
    id: 4,
    title: "Building Resilient Infrastructure in Island Nations",
    category: "Development",
    date: "Jul 05, 2024",
    author: "MICHAEL RODRIGUEZ",
    image: "https://images.unsplash.com/photo-1573160813959-df05c19ffc9e?w=400&h=250&fit=crop&crop=center",
    initiative: "adaptation-resilience"
  },
  {
    id: 5,
    title: "Renewable Energy Transition in Developing Countries",
    category: "Energy Policy",
    date: "Jul 20, 2024",
    author: "EMMA JOHNSON",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop&crop=center",
    initiative: "energy-climate"
  },
  {
    id: 6,
    title: "Carbon Markets and Climate Finance Mechanisms",
    category: "Climate Finance",
    date: "Jul 18, 2024",
    author: "DAVID THOMPSON",
    image: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=400&h=250&fit=crop&crop=center",
    initiative: "energy-climate"
  },
  {
    id: 7,
    title: "Sustainable Urban Planning for the 21st Century",
    category: "Urban Policy",
    date: "Jul 25, 2024",
    author: "LISA WANG",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop&crop=center",
    initiative: "green-transitions"
  },
  {
    id: 8,
    title: "Green Finance and Sustainable Investment Frameworks",
    category: "Finance",
    date: "Jul 22, 2024",
    author: "ROBERT MILLER",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center",
    initiative: "trade-finance"
  }
];

const InitiativesSection: React.FC = () => {
  const [selectedInitiative, setSelectedInitiative] = useState<string>("eurasian-studies");
  // State for mobile accordion
  const [accordionOpen, setAccordionOpen] = useState<string | null>(initiativesData[0]?.slug || null);

  const filteredBlogs = blogPostsData.filter(blog => blog.initiative === selectedInitiative);
  const displayBlogs = filteredBlogs.length >= 2 ? filteredBlogs.slice(0, 2) : filteredBlogs;

  const handleAccordionClick = (slug: string) => {
    setAccordionOpen(accordionOpen === slug ? null : slug);
    setSelectedInitiative(slug);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row">
          {/* Mobile Accordion View */}
          <div className="w-full sm:hidden">
            <h2 className="text-2xl font-bold mb-4">Initiatives</h2>
            <div className="space-y-2">
              {initiativesData.map((initiative) => (
                <div key={initiative.id}>
                  <button
                    onClick={() => handleAccordionClick(initiative.slug)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-800 text-white rounded-lg transition-colors hover:bg-gray-700"
                  >
                    <span className="font-medium">{initiative.name}</span>
                    <ChevronUp
                      size={20}
                      className={`transition-transform duration-300 ${accordionOpen === initiative.slug ? 'transform rotate-0' : 'transform rotate-180'
                        }`}
                    />
                  </button>
                  {accordionOpen === initiative.slug && (
                    <div className="mt-2 p-4 bg-gray-800 rounded-lg">
                      <div className="grid gap-8">
                        {filteredBlogs.length > 0 ? (
                          filteredBlogs.map((blog) => (
                            <div
                              key={blog.id}
                              className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer"
                            >
                              <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-1/3">
                                  <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover"
                                  />
                                </div>
                                <div className="w-full sm:w-2/3 p-4 sm:p-6">
                                  <div className="flex items-center gap-4 mb-2 sm:mb-3">
                                    <span className="text-yellow-400 text-sm font-medium">
                                      {blog.category}
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                      {blog.date}
                                    </span>
                                  </div>
                                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 leading-tight">
                                    {blog.title}
                                  </h3>
                                  <div className="flex items-center">
                                    <div className="w-8 h-0.5 bg-yellow-400 mr-3"></div>
                                    <span className="text-yellow-400 text-sm font-medium uppercase tracking-wide">
                                      {blog.author}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-400 text-sm">No articles found for this initiative.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Sidebar View */}
          <div className="w-80 bg-gray-800 min-h-screen hidden sm:block">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-8">Initiatives</h2>
              <div className="space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
                {initiativesData.map((initiative) => (
                  <button
                    key={initiative.id}
                    onClick={() => setSelectedInitiative(initiative.slug)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${selectedInitiative === initiative.slug
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    {initiative.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area - Blog Cards (Desktop) */}
          <div className="flex-1 p-8 hidden sm:block">
            <div className="max-w-4xl">
              {displayBlogs.length > 0 ? (
                <div className="grid gap-8">
                  {displayBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer"
                    >
                      <div className="flex">
                        <div className="w-1/3">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-yellow-400 text-sm font-medium">
                              {blog.category}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {blog.date}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-4 leading-tight">
                            {blog.title}
                          </h3>
                          <div className="flex items-center">
                            <div className="w-8 h-0.5 bg-yellow-400 mr-3"></div>
                            <span className="text-yellow-400 text-sm font-medium uppercase tracking-wide">
                              {blog.author}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No articles found for this initiative.</p>
                </div>
              )}

              {/* View All Button */}
              {displayBlogs.length > 0 && (
                <div className="text-center mt-12">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                    View All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button className="fixed bottom-6 right-6 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
        <ChevronUp size={20} />
      </button>
    </div>
  );
};

export default InitiativesSection;
