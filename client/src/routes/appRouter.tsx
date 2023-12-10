import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../components/HomePage'
import Institutes from '../components/Institutes'
import InstituteInfo from '../components/InstituteInfo'
import Register from '../components/Register'
import LogOut from '../components/LogOut'
import Login from '../components/Login'
import UserContext from '../context/userContext'
import Contact from '../components/Contact'

const AppRouter = () => {
  const { user } = useContext(UserContext)
  return (
    <Routes>
      <Route path="/register" element={<Register />} ></Route>
      <Route path="/login" element={<Login />} ></Route>
      <Route path="/logout" element={<LogOut />} ></Route>
      <Route path="/" element={<HomePage />} ></Route>
      <Route path="/institutes" element={<Institutes />}> </Route>
      <Route path="/info/:id" element={<InstituteInfo />} ></Route>
      <Route path="/contact" element={<Contact />} ></Route>
      <Route path="*" element={<h1>404</h1>}> </Route>
    </Routes >
  )
}

export default AppRouter
