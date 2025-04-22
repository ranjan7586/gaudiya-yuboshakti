import React from 'react'
import Home from '../pages/user/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPanel from '../pages/Admin/AdminPanel'
import BlogEditor from '../components/common/BlogEditor'
import BlogDetails from '../components/common/BlogDetails'

type Props = {}

const Router = (props: Props) => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<BlogDetails />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/admin/add-blog' element={<BlogEditor />} />
    </Routes>
    </BrowserRouter>
  )
}

export default Router