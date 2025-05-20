import Home from '../pages/user/Home'
import AdminRoute from '../pages/Admin/AdminRoute'
import AdminPanel from '../pages/Admin/AdminPanel'
import CreateBlog from '../pages/Admin/CreateBlog'
// import BlogEditor from '../components/common/BlogEditor'
import BlogDetails from '../components/common/BlogDetails'
import BlogListing from '../components/common/BlogListing'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLogin'
import { UserProvider } from '../contexts/UserContext'


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/list/:type' element={<BlogListing />} />
        <Route path='/blog/details/:blog-id' element={<BlogDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path='/admin' element={
          <UserProvider>
            <AdminRoute />
          </UserProvider>
        } >
          {/* <Route path='add-blog' element={<BlogEditor />} /> */}
          <Route path='dashboard' element={<AdminPanel />} />
          <Route path='posts/add-post' element={<CreateBlog />} />
          <Route path='posts/update-post/:id' element={<CreateBlog is_update={true} />} />
        </Route>
        {/* <Route path='/admin' element={<AdminPanel />} /> */}
        {/* <Route path='/admin/add-blog' element={<BlogEditor />} /> */}

      </Routes>
    </BrowserRouter>
  )
}

export default Router