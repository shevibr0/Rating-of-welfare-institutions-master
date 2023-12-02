import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './routes/AppRouter'
import axios from "axios"
import UserContext, { User } from './context/userContext'
import { useState, useEffect } from 'react'
axios.defaults.withCredentials = true
function App() {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data } = await axios.get<{ msg: string, user: User }>("http://localhost:3000/users/checkAuth")
      setUser(data.user)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
