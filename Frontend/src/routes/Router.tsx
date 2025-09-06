import Home from '../pages/user/Home'
import AdminRoute from '../pages/Admin/AdminRoute'
import CreateBlog from '../pages/Admin/CreateBlog'
import BlogDetails from '../components/common/BlogDetails'
import BlogListing from '../components/common/BlogListing'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLogin'
import { UserProvider } from '../contexts/UserContext'
import HeaderTest from '../components/user/HeaderTest'
import ContactUs from '../components/user/ContactUs'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import PostsContent from '../components/Admin/PostsContent'
import CategoriesContent from '../components/Admin/CategoriesContent'
import UsersContent from '../components/Admin/UsersContent'
import ScrollToTop from '../contexts/ScrollToTop'
import ForumsContent from '../components/Admin/ForumsContent'
import CreateForum from '../pages/Admin/CreateForum'
import TagsContent from '../components/Admin/TagsContent'


const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/headertest' element={<HeaderTest />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/list/:filter_type/:type' element={<BlogListing />} />
        <Route path='/blog/details/:blog-id' element={<BlogDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path='/admin' element={
          <UserProvider>
            <AdminRoute />
          </UserProvider>
        } >
          {/* <Route path='add-blog' element={<BlogEditor />} /> */}
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='posts' element={<PostsContent />} />
          <Route path='forums' element={<ForumsContent />} />
          <Route path='users' element={<UsersContent />} />
          <Route path='categories' element={<CategoriesContent />} />
          <Route path='tags' element={<TagsContent />} />
          <Route path='posts/add-post' element={<CreateBlog />} />
          <Route path='forums/add-forum' element={<CreateForum />} />
          <Route path='forums/update-forum/:id' element={<CreateForum is_update={true} />} />
          <Route path='posts/update-post/:id' element={<CreateBlog is_update={true} />} />
        </Route>
        {/* <Route path='/admin' element={<AdminPanel />} /> */}
        {/* <Route path='/admin/add-blog' element={<BlogEditor />} /> */}

      </Routes>
    </BrowserRouter>
  )
}

export default Router