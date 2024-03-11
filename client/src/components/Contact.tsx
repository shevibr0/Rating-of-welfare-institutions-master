import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Navbar from './Navbar';

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

        // <div className="w-[1920px] h-[1080px] relative bg-white">


        //     <form
        //         className="w-[950px] h-[721px] left-[760px] top-[259px] absolute bg-white shadow"
        //         onSubmit={handleSubmit(onSubmit)}
        //     >
        //         <h2 className="text-xl font-semibold mb-4 text-purple-700 text-center">צור קשר</h2>

        //         <label className="block mb-2 text-orange-400 text-right">שם</label>
        //         <input
        //             type="text"
        //             {...register('name', { required: 'שם הוא שדה חובה' })}
        //             className="block w-full p-2 mb-4 border rounded-md"
        //         />
        //         {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        //         <label className="block mb-2 text-orange-400 text-right">אימייל</label>
        //         <input
        //             type="email"
        //             {...register('email', {
        //                 required: 'אימייל הוא שדה חובה',
        //                 pattern: {
        //                     value: /^\S+@\S+$/i,
        //                     message: 'כתובת אימייל לא תקינה',
        //                 },
        //             })}
        //             className="block w-full p-2 mb-4 border rounded-md"
        //         />
        //         {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        //         <label className="block mb-2 text-orange-400 text-right">טלפון</label>
        //         <input
        //             type="tel"
        //             {...register('phone', { required: 'טלפון הוא שדה חובה' })}
        //             className="block w-full p-2 mb-4 border rounded-md"
        //         />
        //         {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        //         <label className="block mb-2 text-orange-400 text-right">הודעה</label>
        //         <textarea
        //             {...register('message', { required: 'הודעה היא שדה חובה' })}
        //             className="block w-full p-2 mb-4 border rounded-md"
        //         />
        //         {errors.message && <p className="text-red-500">{errors.message.message}</p>}

        //         <button type="submit" className="w-full p-2 bg-purple-700 text-white rounded-md">
        //             שלח
        //         </button>
        //     </form>
        // </div>





        <div className="w-full min-h-screen relative bg-orange-100">
            <Navbar />

            <div className="left-[1538px] top-[154px] absolute">
                <div className="w-[115px] h-[0px] left-[35px] top-[62px] absolute border-4 border-black"></div>
                <div className="text-right text-black text-[40px] font-normal font-['Alef']">יצירת קשר</div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative w-[950px] h-[721px] left-[760px] top-[259px]">
                    <div className="absolute bg-white w-full h-full p-9 shadow-xl ring-1.5" />
                    <div className="absolute bg-white w-full h-[40px] -top-0 before:content-[''] before:block before:absolute before:inset-x-0 before:top-0 before:h-[10px] before:shadow-lg before:bg-white before:z-10" />
                </div>

                <input
                    type="text"
                    {...register('name', { required: 'שם הוא שדה חובה' })}
                    style={{ direction: 'rtl' }}
                    className="w-[620px] h-[87px] left-[933px] top-[319px] absolute bg-orange-100 border border-black border-opacity-30"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}


                <input
                    type="email"
                    {...register('email', {
                        required: 'אימייל הוא שדה חובה',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'כתובת אימייל לא תקינה',
                        },
                    })}
                    style={{ direction: 'rtl' }}
                    className="w-[620px] h-[87px] left-[933px] top-[436px] absolute bg-orange-100 border border-black border-opacity-30"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input
                    type="tel"
                    {...register('phone', { required: 'טלפון הוא שדה חובה' })}
                    style={{ direction: 'rtl' }}
                    className="w-[620px] h-[87px] left-[933px] top-[553px] absolute bg-orange-100 border border-black border-opacity-30"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                <textarea
                    {...register('message', { required: 'הודעה היא שדה חובה' })}
                    style={{ direction: 'rtl' }}
                    className="w-[620px] h-[203px] left-[933px] top-[670px] absolute bg-orange-100 border border-black border-opacity-30 textarea-placeholder"
                    placeholder="במידה ויש לכם תובנה, בקשה, הארה, הערה, רעיון לפיתוח האתר או כל דבר, אשמח מאד שתכתבו לי אני קוראת הכל."
                />
                {errors.message && <p className="text-red-500">{errors.message.message}</p>}

                <button className="px-[76px] py-1.5 left-[1132px] top-[893px] absolute bg-purple-500
                     hover:bg-orange-300 text-right text-indigo-50 text-[28px] font-bold font-['Alef'] leading-[45px] hover:text-purple-500 justify-center items-center gap-2.5 inline-flex transition-all duration-300">
                    שלח
                </button>

                {/* box massage style */}
                <div className="w-[52px] h-[19px] left-[1497px] top-[652px] absolute bg-white" />
                {/* box phone style */}
                <div className="w-[52px] h-[19px] left-[1496px] top-[535px] absolute bg-white" />
                {/* box email style */}
                <div className="w-[88px] h-[19px] left-[1460px] top-[418px] absolute bg-white" />
                <label className="left-[1504px] top-[540px] absolute text-black text-xl font-normal font-['Inter']">טלפון</label>
                <label className="left-[1502px] top-[657px] absolute text-black text-xl font-normal font-['Inter']">הודעה</label>
                <label className="left-[1466px] top-[423px] absolute text-black text-xl font-normal font-['Inter']">כתובת מייל</label>
                {/* box name style */}
                <div className="w-[34px] h-[19px] left-[1514px] top-[301px] absolute bg-white" />
                <label className="left-[1519px] top-[306px] absolute text-black text-xl font-normal font-['Inter']">שם</label>
            </form >
            <img className="w-[805px] h-[792px] left-[98px] top-[243px] absolute" src="public/contact.svg" />
            <img className="w-[370px] h-[481px] left-[1566px] top-[533px] absolute" src="public/atziz.svg" />
        </div>
    )
};

export default ContactForm;
