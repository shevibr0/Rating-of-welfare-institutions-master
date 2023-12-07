import axios, { AxiosError } from 'axios'
import { useObjectState } from 'mg-js'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router'

type Inputs = {
  name: string,
  email: string,
  password: string
}
const Register = () => {
  const [error, setError] = useState("")
  const nav = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/users/register', data);
      console.log("response", response);
      nav("/login")
    } catch (err: any) {
      if (err.response.status == 409) {
        setError("email is already exist")
      }
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-purple-500">
      <form
        className="bg-orange-400 p-8 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block mb-2 text-white">Name:</label>
        <input
          type="text"
          {...register('name', {
            required: 'Name is required',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Invalid name format',
            },
            minLength: {
              value: 2,
              message: "the name is too short"
            }
          })}
          className="block w-full p-2 mb-4 border rounded-md"
        />
        {errors.name && (
          <p className="text-red-500">{errors.name.message}</p>
        )}

        <label className="block mb-2 text-white">Email:</label>
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
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        {error &&
          <p className="text-red-500">{error}</p>
        }

        <label className="block mb-2 text-white">Password:</label>
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
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-purple-700 text-white rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default Register


