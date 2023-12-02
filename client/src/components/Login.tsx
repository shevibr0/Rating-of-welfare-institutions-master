import React from 'react'
import axios from 'axios'
import { useObjectState } from 'mg-js'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/users/login', data);
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
    </div>
  );
};

export default Login;
