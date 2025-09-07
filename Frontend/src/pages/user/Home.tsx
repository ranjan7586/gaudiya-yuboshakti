import LatestBlogs from '../../components/common/LatestBlogs'
import HeroCarousel from '../../components/common/HeroCarousel'
import FeaturedBlogs from '../../components/common/FeaturedBlogs'
import ContactUs from '../../components/user/ContactUs'
import FeaturedVideos from '../../components/common/FeaturedVideos'
import ForumApp from '../../components/user/Forum'
import InitiativesSection from '../../components/user/Initiatives'


const Home = () => {
  return (
    <div>
      {/* <Header /> */}
      <div className="min-h-screen bg-gray-100">
        <main className="pb-20">
          <HeroCarousel />
          <FeaturedBlogs />
          <LatestBlogs />
          <ForumApp mode={'home'} />
          <InitiativesSection />
          <FeaturedVideos mode={'home'} />
          <ContactUs />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default Home