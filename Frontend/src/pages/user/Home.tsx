import Header from '../../components/user/Header'
import LatestBlogs from '../../components/common/LatestBlogs'
import HeroCarousel from '../../components/common/HeroCarousel'
import FeaturedBlogs from '../../components/common/FeaturedBlogs'
import Footer from '../../components/user/Footer'
import ContactUs from '../../components/user/ContactUs'
import FeaturedVideos from '../../components/common/FeaturedVideos'


const Home = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <main className="pt-64 md:pt-72 pb-20">
          <HeroCarousel />
          <FeaturedBlogs />
          <LatestBlogs />
          <FeaturedVideos/>
          <ContactUs/>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Home