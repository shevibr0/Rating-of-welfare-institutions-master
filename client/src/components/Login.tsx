// Login.tsx
import React, { useContext } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import UserContext, { User } from '../context/userContext';
import Cookies from 'js-cookie';

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post<{ accessToken: string }>('http://localhost:3000/users/login', data);
      console.log('response', response);
      Cookies.set('access_token', response.data.accessToken);
      console.log('access_token', response.data.accessToken);
      updateUserContext();
      nav('/');
    } catch (err: any) {
      // Handle login failure
      console.error('Login failed');
    }
  };

  const updateUserContext = async () => {
    try {
      const { data } = await axios.get<{ msg: string; user: User }>('http://localhost:3000/users/checkAuth');
      setUser(data.user);
    } catch (error) {
      console.log('Failed to update user context');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-purple-500 bg-opacity-30">
      <form
        className="bg-transparent p-8 rounded-lg shadow-md w-96 relative border-2 border-orange-400"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-semibold mb-4 text-purple-700 text-center">התחברות</h2>

        <label className="block mb-2 text-orange-400 text-right">מייל</label>
        <input
          type="email"
          {...register('email', {
            required: 'כתובת דוא"ל היא שדה חובה',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'כתובת דוא"ל לא תקינה',
            },
          })}
          className="block w-full p-2 mb-4 border rounded-md"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label className="block mb-2 text-orange-400 text-right">סיסמה</label>
        <input
          type="password"
          {...register('password', {
            required: 'סיסמה היא שדה חובה',
            minLength: {
              value: 6,
              message: 'הסיסמה צריכה לכלול לפחות 6 תווים',
            },
          })}
          className="block w-full p-2 mb-4 border rounded-md"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="w-full p-2 bg-purple-700 text-white rounded-md">
          התחברות
        </button>
      </form>
    </div>
  );
};

export default Login;
