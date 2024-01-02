// ContactForm.tsx
import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

type ContactFormInputs = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormInputs>();

    const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
        try {
            alert('תודה רבה');
            // Assuming you have an endpoint to handle the form submission
            // await axios.post('http://localhost:3000/contact', data);
            // console.log('Form submitted successfully');
        } catch (error) {
            console.error('Form submission failed', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-purple-500 bg-opacity-30">
            <div className="text-xl font-semibold mb-4 text-purple-700 text-center">
                האתר נועד לשרת עובדים סוציאלים מכל הארץ ויותר מאשמח להארה/הארה, יוזמה <br />מחשבה או תובנה חדשה על מנת לשפר ולייעל את חווית האתר
            </div>

            <form
                className="bg-transparent p-8 rounded-lg shadow-md w-96 relative border-2 border-orange-400"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-xl font-semibold mb-4 text-purple-700 text-center">צור קשר</h2>

                <label className="block mb-2 text-orange-400 text-right">שם</label>
                <input
                    type="text"
                    {...register('name', { required: 'שם הוא שדה חובה' })}
                    className="block w-full p-2 mb-4 border rounded-md"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <label className="block mb-2 text-orange-400 text-right">אימייל</label>
                <input
                    type="email"
                    {...register('email', {
                        required: 'אימייל הוא שדה חובה',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'כתובת אימייל לא תקינה',
                        },
                    })}
                    className="block w-full p-2 mb-4 border rounded-md"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <label className="block mb-2 text-orange-400 text-right">טלפון</label>
                <input
                    type="tel"
                    {...register('phone', { required: 'טלפון הוא שדה חובה' })}
                    className="block w-full p-2 mb-4 border rounded-md"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                <label className="block mb-2 text-orange-400 text-right">הודעה</label>
                <textarea
                    {...register('message', { required: 'הודעה היא שדה חובה' })}
                    className="block w-full p-2 mb-4 border rounded-md"
                />
                {errors.message && <p className="text-red-500">{errors.message.message}</p>}

                <button type="submit" className="w-full p-2 bg-purple-700 text-white rounded-md">
                    שלח
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
