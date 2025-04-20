import React from 'react'
import Header from '../../components/user/Header'
import HeroCarousel from '../../components/common/HeroCarousel'
import FeaturedBlogs from '../../components/common/FeaturedBlogs'
import LatestBlogs from '../../components/common/LatestBlogs'

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