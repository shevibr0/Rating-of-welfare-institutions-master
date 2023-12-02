import axios, { AxiosError } from 'axios'
import { useObjectState } from 'mg-js'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
type Inputs = {
  name: string,
  email: string,
  password: string
}
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/users/register', data);
      console.log("response", response);
    } catch (err: any) {
      // if (err.response.status == 409) {
      //   return ({ message: "email is already exist" })
      // }
      console.error("register fail")
    }
  }
  const genError = (err: string, option: React.CSSProperties) => <span style={option}>{err}</span>
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>name:</label>
        <input
          type="text"
          {...register('name', {
            required: 'Name is required',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Invalid name format',
            },
          })}
        ></input>
        {errors.name && (
          <p style={{ color: 'red' }}>{errors.name.message}</p>
        )}

        <label>email:</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
        ></input>
        {errors.email && (
          <p style={{ color: 'red' }}>{errors.email.message}</p>
        )}

        <label>password:</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        ></input>
        {errors.password && (
          <p style={{ color: 'red' }}>{errors.password.message}</p>
        )}

        <button type="submit">Send</button>
      </form>
    </div >
  )
}

export default Register


