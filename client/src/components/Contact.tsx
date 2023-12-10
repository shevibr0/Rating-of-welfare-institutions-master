import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

type ContactFormInputs = {
    name: string;
    email: string;
    phone: string;
};

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormInputs>();

    const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
        try {
            alert("thank you")
            // // Assuming you have an endpoint to handle the form submission
            // await axios.post('http://localhost:3000/contact', data);
            // console.log('Form submitted successfully');
        } catch (error) {
            console.error('Form submission failed', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-purple-500 bg-opacity-30">
            <form
                className="bg-transparent p-8 rounded-lg shadow-md w-96 relative border-2 border-orange-400"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-xl font-semibold mb-4 text-purple-700 text-center">Contact Us</h2>

                <label className="block mb-2 text-orange-400">Name:</label>
                <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="block w-full p-2 mb-4 border rounded-md"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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

                <label className="block mb-2 text-orange-400">Phone:</label>
                <input
                    type="tel"
                    {...register('phone', { required: 'Phone is required' })}
                    className="block w-full p-2 mb-4 border rounded-md"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                <button type="submit" className="w-full p-2 bg-purple-700 text-white rounded-md">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
