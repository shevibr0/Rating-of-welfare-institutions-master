import axios from 'axios';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [error, setError] = useState('');
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/users/register', data);
      console.log('response', response);
      nav('/login');
    } catch (err: any) {
      if (err.response.status === 409) {
        setError('האימייל כבר קיים');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-purple-500">
      <form
        className="bg-orange-400 p-8 rounded-lg shadow-md w-96 text-right"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-semibold mb-4 text-purple-700 text-center">הרשמה</h2>
        <label className="block mb-2 text-white">שם</label>
        <input
          type="text"
          {...register('name', {
            required: 'שם חובה',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'פורמט שם לא תקין',
            },
            minLength: {
              value: 2,
              message: 'שם קצר מידי',
            },
          })}
          className="block w-full p-2 mb-4 border rounded-md"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <label className="block mb-2 text-white">מייל</label>
        <input
          type="email"
          {...register('email', {
            required: 'מייל חובה',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'כתובת מייל לא תקינה',
            },
          })}
          className="block w-full p-2 mb-4 border rounded-md"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <label className="block mb-2 text-white">סיסמה</label>
        <input
          type="password"
          {...register('password', {
            required: 'סיסמה חובה',
            minLength: {
              value: 6,
              message: 'הסיסמה חייבת להכיל לפחות 6 תווים',
            },
          })}
          className="block w-full p-2 mb-4 border rounded-md"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="w-full p-2 bg-purple-700 text-white rounded-md">
          שלח
        </button>
      </form>
    </div>
  );
};

export default Register;
