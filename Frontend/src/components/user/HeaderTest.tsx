import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function HeaderTest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      console.log("prevScrollPos", prevScrollPos);
      console.log("currentScrollPos", currentScrollPos);
      
      // Set visible based on scroll direction
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const menuItems = ["Home", "Products", "Services", "About", "Contact"];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header 
        className={`fixed w-full bg-white shadow-md transition-transform duration-500 z-50 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-800">Logo</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <a 
                    key={item} 
                    href="#" 
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Header Scroll Animation Example</h1>
          
          <p className="mb-6 text-gray-600">Scroll down to see the header animation. When scrolling up, the header will reappear. When scrolling down, it will slide up and disappear.</p>
          
          {/* Generate content for scrolling */}
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Section {index + 1}</h2>
              <p className="text-gray-600">
                This is a sample section to demonstrate the header scroll animation. Keep scrolling to see how the header responds to scroll direction.
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}