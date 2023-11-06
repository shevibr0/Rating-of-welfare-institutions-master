import React from 'react'
import { Route, Routes } from 'react-router'

const AppRouter = () => {
  return (
   <Routes>
    <Route path="/" element={<h1>hel</h1>} ></Route>
    <Route path="/test" element={<h1>test</h1>} ></Route>
   </Routes>
  )
}

export default AppRouter
