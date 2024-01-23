import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../components/HomePage'
import InstituteInfo from '../components/InstituteInfo'
import Register from '../components/Register'
import LogOut from '../components/LogOut'
import Login from '../components/Login'
import UserContext from '../context/userContext'
import Contact from '../components/Contact'
import Rating from '../components/Rating'
import PreviousComments from '../components/PreviousComments'
import ThreeTop from '../components/ThreeTop'
import Institute from '../components/Institute'
import InstitutesCategory from '../components/InstitutesCategory'
import InstituteByCategory from '../components/InstituteByCategory'
import DetailsComments from '../components/DetailsComments'

const AppRouter = () => {
  const { user } = useContext(UserContext)
  return (
    <Routes>
      <Route path="/register" element={<Register />} ></Route>
      <Route path="/login" element={<Login />} ></Route>
      <Route path="/logout" element={<LogOut />} ></Route>
      <Route path="/" element={<HomePage />} ></Route>
      <Route path="/institutes" element={<Institute />}> </Route>
      <Route path="/institutesCategory" element={<InstitutesCategory />}> </Route>
      <Route path="/institutesCategory/:id" element={<InstituteByCategory />}> </Route>
      <Route path="/info/:id/previousComments" element={<PreviousComments />}> </Route>
      <Route path="/info/:id/previousComments/detailsComments/:reviewId" element={<DetailsComments />} />
      <Route path="/info/:id/rating" element={<Rating />}> </Route>
      <Route path="/info/:id" element={<InstituteInfo />} ></Route>
      <Route path="/contact" element={<Contact />} ></Route>
      <Route path="/threeTop" element={<ThreeTop />} ></Route>
      <Route path="*" element={<h1>404</h1>}> </Route>
    </Routes >
  )
}

export default AppRouter
