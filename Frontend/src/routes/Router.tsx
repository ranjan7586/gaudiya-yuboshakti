import React from 'react'
import Home from '../pages/user/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Props = {}

const Router = (props: Props) => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
    </Routes>
    </BrowserRouter>
  )
}

export default Router