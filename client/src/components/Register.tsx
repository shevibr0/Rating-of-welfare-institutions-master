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
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }
  const genError = (err: string, option: React.CSSProperties) => <span style={option}>{err}</span>
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>name:</label>
        <input type='text'{...register("name", { required: true })}></input>
        {errors.name && genError("name is required", {
          color: "red"
        })}
        <label>email:</label>
        <input type='email' {...register("email", { required: true })} ></input>
        <label>password:</label>
        <input type='number' {...register("password", { required: true })}></input>
        <button type='submit'>Send</button>

      </form>
    </div >
  )
}

export default Register
