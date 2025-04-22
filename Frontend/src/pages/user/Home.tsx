import React from 'react'
import Header from '../../components/user/Header'
import LatestBlogs from '../../components/common/LatestBlogs'
import HeroCarousel from '../../components/common/HeroCarousel'
import FeaturedBlogs from '../../components/common/FeaturedBlogs'

type Props = {}

const Home = (props: Props) => {
  return (
    <div>
        <Header/>
        <HeroCarousel/>
        <FeaturedBlogs/>
        <LatestBlogs/>
    </div>
  )
}

export default Home