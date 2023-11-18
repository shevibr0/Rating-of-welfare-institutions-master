import React from 'react'
import axios from 'axios'
import { useObjectState } from 'mg-js'


const Login = () => {
  const [data, setData] = useObjectState(["email", "password"])
  console.log(data)
  const login = async (e: any) => {
    e.preventDefault()
    const { data: resp } = await axios.post("http://localhost:3000/users/login", data)
    console.log(resp)
  }
  return (
    <div>
      <form onSubmit={login}>
        <label>email:</label>
        <input type='email' value={data.email} onChange={(e) => setData("email", e.target.value)}></input>
        <label>password:</label>
        <input type='number' value={data.password} onChange={(e) => setData("password", e.target.value)}></input>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default Login
