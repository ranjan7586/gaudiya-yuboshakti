import Home from '../pages/user/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPanel from '../pages/Admin/AdminPanel'
import BlogEditor from '../components/common/BlogEditor'
import BlogDetails from '../components/common/BlogDetails'
import AdminRoute from '../pages/Admin/AdminRoute'
import CreateBlog from '../pages/Admin/CreateBlog'


const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<BlogDetails />} />
        <Route path='/admin' element={<AdminRoute />} >
          <Route path='add-blog' element={<BlogEditor />} />
          <Route path='dashboard' element={<AdminPanel />} />
          <Route path='posts/add-post' element={<CreateBlog />} />
        </Route>
        {/* <Route path='/admin' element={<AdminPanel />} /> */}
        {/* <Route path='/admin/add-blog' element={<BlogEditor />} /> */}

    </Routes>
    </BrowserRouter>
  )
}

export default Router