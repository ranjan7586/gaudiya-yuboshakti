import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';

interface Blog {
  _id: string;
  thumbnail_img: string;
  title: string;
  description: string;
}

const HeroCarousel = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getHeroBlogs = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/list`, {
        page: 1,
        limit: 6,
        filterType: 'tags',
        filterBy: 'trending',
      });
      setBlogs(data.data);
    } catch (error) {
      console.log(error)
    }
  };

  // Create an extended array with duplicated first item at the end for seamless looping
  let extendedBlogs;
  if (blogs && blogs.length > 0) {
    extendedBlogs = [...blogs, blogs[0]];
  }

  const handleTransitionEnd = () => {
    // When we reach the cloned first slide (at position length), 
    // quickly reset to the real first slide without animation
    if (currentIndex === blogs.length) {
      if (carouselRef.current) {
        carouselRef.current.style.transition = 'none';
        setCurrentIndex(0);
        // Force browser to process the style change before re-enabling transitions
        setTimeout(() => {
          if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 500ms ease-in-out';
          }
        }, 50);
      }
    }
    setIsSliding(false);
  };

  const goToSlide = (index: number) => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    if (isSliding) return;
    setIsSliding(true);

    if (currentIndex === 0) {
      // Handle wrapping to the last slide
      // First, go to the final clone without animation
      if (carouselRef.current) {
        carouselRef.current.style.transition = 'none';
        setCurrentIndex(blogs.length);

        // Force browser to process the style change before animating to the actual last slide
        setTimeout(() => {
          if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 500ms ease-in-out';
            setCurrentIndex(blogs.length - 1);
          }
        }, 50);
      }
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    // The transition end handler will reset to first slide if needed
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSliding) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isSliding]);

  useEffect(() => {
    getHeroBlogs();
  }, []);

  return (
    <div className="relative h-auto container mx-auto mt-10 shadow-lg rounded-lg overflow-hidden">
      <div className="relative w-full h-96 sm:h-150 overflow-hidden">
        {extendedBlogs && extendedBlogs.length > 0 && (
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{
              width: `${extendedBlogs.length * 100}%`,
              transform: `translateX(-${(currentIndex * (100 / extendedBlogs.length))}%)`
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedBlogs && extendedBlogs.map((blog, index) => (
              <div key={index} className="flex-shrink-0" style={{ width: `${100 / extendedBlogs.length}%` }}>
                <NavLink to={`/blog/details/${blog._id}`} key={index}>
                  <div className="relative w-full h-full">
                    <img
                      src={blog.thumbnail_img}
                      alt={blog.title}
                      className="w-4/5 h-full object-cover"
                    />
                    <div className="absolute bottom-1/2 left-3/5 right-0 bg-gray-500 bg-opacity-90 p-4">
                      <h2 className="text-xl font-bold text-orange-600">{blog.title}</h2>
                      {/* <p className="text-gray-600">{blog.description}</p> */}
                      <div dangerouslySetInnerHTML={{ __html: blog.description.substring(0, 50) }} />
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/4 left-4 bg-white bg-opacity-70 hover:bg-orange-100 text-orange-600 px-2 py-1 rounded-full shadow cursor-pointer"
        disabled={isSliding}
      >
        ⟨
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/4 right-4 bg-white bg-opacity-70 hover:bg-orange-100 text-orange-600 px-2 py-1 rounded-full shadow cursor-pointer"
        disabled={isSliding}
      >
        ⟩
      </button>

      {/* Indicator Dots - only show for real slides, not clones */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {blogs.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${index === (currentIndex % blogs.length) ? 'bg-orange-600' : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel
