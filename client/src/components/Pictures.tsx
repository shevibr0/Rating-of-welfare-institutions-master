import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const Pictures = () => {

    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState([]);
    const params = useParams();
    const institutId = params["id"]



    useEffect(() => {
        // Fetch images from the server based on institution ID
        const fetchImages = async (institutId: any) => {
            try {
                const response = await axios.get(`http://localhost:3000/reviews/getImages?institutId=${institutId}`);
                setImages(response.data.imageUrls)
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
        fetchImages(institutId);
    }, [institutId]);


    return (
        <div className="bg-orange-100 h-screen">
            <div>
                <button className="left-0 top-0 lg:hidden md:hidden sm:hidden" onClick={() => { setIsOpen(!isOpen) }} >
                    <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 11h16M4 16h16" />
                    </svg>
                </button >
                {isOpen && (
                    <nav className="lg:hidden md:hidden sm:hidden left-0 top-0 flex shadow bg-white  justify-around items-center text-purple-500 lg:text-3xl lg:h-[80px] md:text-2m md:h-[30px] sm:text-sm  text-xs mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer">
                        <div onClick={() => nav('/login')}>
                            הרשמה
                        </div>
                        <div onClick={() => nav('/contact')}>
                            צור קשר
                        </div>
                        <div onClick={() => nav('/threeTop')}>
                            מוסדות בדירוג הגבוה ביותר
                        </div>
                        <div onClick={() => nav('/institutesCategory')}>
                            מוסדות בארץ
                        </div>
                        <div className='font-bold'>
                            אודות
                        </div>
                    </nav>
                )}
                <div className="flex  justify-center items-center">
                    <img className="mt-2 lg:hidden md:hidden sm:hidden max-w-[25%]" src="public/לוגו.svg" alt="Logo" />

                </div>
                <nav className="hidden lg:flex md:flex sm:flex left-0 top-0 shadow bg-white  justify-center  items-center  text-purple-500 lg:text-2xl  lg:h-[47px] md:text-sm  md:h-[40px] sm:text-xs  sm:space-x-12 sm:h-[40px]  mt-4 sm:mt-0 font-normal font-['Alef'] leading-[45px] cursor-pointer space-x-11">
                    <img className="max-w-[2%] lg:max-w-[4%] lg:mr-15  md:max-w-[4%] sm:max-w-[3%]" src="/לוגו.svg" alt="Logo" />
                    <div onClick={() => nav('/register')}>
                        התחברות
                    </div>
                    <div onClick={() => nav('/login')}>
                        הרשמה
                    </div>
                    <div onClick={() => nav('/contact')}>
                        צור קשר
                    </div>
                    <div onClick={() => nav('/threeTop')}>
                        מוסדות בדירוג הגבוה ביותר
                    </div>
                    <div className='font-bold' onClick={() => nav('/institutesCategory')}>
                        מוסדות בארץ
                    </div>
                    <div onClick={() => nav('/')}>
                        אודות
                    </div>
                </nav>
                <div className='flex items-center'>
                    <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15  md:max-w-[1%] sm:max-w-[1%]" src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
                </div>
            </div>
            <div className='flex flex-wrap'>
                <div className="w-full lg:w-1/4  md:w-1/2  px-4 mb-8">
                    <h2 className="text-center text-black text-[40px] font-normal font-['Alef']">תמונות מהמסגרת</h2>
                    {images.map((image, index) => (
                        <img className='w-80 h-[246px] border-2 border-purple-500' key={index} src={image} alt={`Image ${index}`} />
                    ))}

                </div>
            </div>
        </div >

    )

}
export default Pictures