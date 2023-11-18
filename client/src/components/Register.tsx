import axios from 'axios'
import { useObjectState } from 'mg-js'
import React from 'react'

const Register = () => {
  const [data, setData] = useObjectState(["name", "email", "password"])
  console.log(data)
  const register = async (e: any) => {
    e.preventDefault()
    const { data: resp } = await axios.post("http://localhost:3000/users/register", data)
    console.log(resp)
  }
  return (
    <div>
      <form onSubmit={register}>
        <label>name:</label>
        <input type='text' value={data.name} onChange={(e) => setData("name", e.target.value)}></input>
        <label>email:</label>
        <input type='email' value={data.email} onChange={(e) => setData("email", e.target.value)}></input>
        <label>password:</label>
        <input type='number' value={data.password} onChange={(e) => setData("password", e.target.value)}></input>
        <button type='submit'>Send</button>
      </form>
    </div >
  )
}

export default Register
