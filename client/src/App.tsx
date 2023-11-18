import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './routes/AppRouter'
import axios from "axios"
axios.defaults.withCredentials = true
function App() {


  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
