import React, { useContext } from 'react'
import axios from 'axios'
import { useObjectState } from 'mg-js'
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router';
import UserContext, { User } from '../context/userContext';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { setUser } = useContext(UserContext)
  const nav = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/users/login', data);
      console.log("response", response);
      updateUserContext()
      nav("/")
    } catch (err: any) {
      // if (err.response.status == 409) {
      //   return ({ message: "email is already exist" })
      // }
      console.error("login fail")
    }
  }
  const updateUserContext = async () => {
    try {
      const { data } = await axios.get<{ msg: string, user: User }>("http://localhost:3000/users/checkAuth")
      setUser(data.user)
    } catch (error) {
      console.log("fail")
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-purple-500 bg-opacity-30">
      <form
        className="bg-transparent p-8 rounded-lg shadow-md w-96 relative border-2 border-orange-400"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block mb-2 text-orange-400">Email:</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
          className="block w-full p-2 mb-4 border rounded-md"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label className="block mb-2 text-orange-400">Password:</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          className="block w-full p-2 mb-4 border rounded-md"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="w-full p-2 bg-purple-700 text-white rounded-md">
          Send
        </button>
      </form>
    </div>
  );
};

export default Login;