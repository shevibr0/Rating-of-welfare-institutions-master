import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import axios from 'axios';

const debounce = _.debounce;

const InstitutesCategory = () => {
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [dataCategory, setDataCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    useEffect(() => {

        onSearchCategories();

    }, []);



    const onSearchCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/institutes/categories');
            setDataCategory(data);
        } catch (error) {
            console.log('failed');
        }
    };


    return (
        <div className="bg-orange-100">

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
                <img className="max-w-[2%] lg:max-w-[4%] lg:mr-15  md:max-w-[4%] sm:max-w-[3%]" src="public/לוגו.svg" alt="Logo" />
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
                <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15  md:max-w-[1%] sm:max-w-[1%]" src="public/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
            </div>
            <span className="flex justify-center items-center  text-purple-700 text-5xl font-bold font-['Alef']">חפש מסגרת לפי קטגוריה</span>
            <div className='flex justify-center items-center'>
                <a href='/institutes' className="ml-5 mt-5 mb-5 text-purple-700 text-sm font-normal font-['Alef'] underline">לחיפוש חופשי לחץ כאן </a>
            </div>

            <div className="flex flex-wrap">
                {dataCategory.map((category: any) => (
                    <div key={category._id} className="w-full  md:w-1/2 lg:w-1/4 px-4 mb-8 ">
                        <div onClick={() => {

                            nav(`/institutesCategory/${category.categoryName}`);
                        }} className="bg-white rounded p-4 shadow-md border border-purple-400 hover:opacity-90  text-purple-700 hover:text-white hover:bg-purple-400  hover:border-white "
                            style={{ direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <button onClick={() => {
                                nav(`/institutesCategory/${category.categoryName}`);
                            }} className={`text-xl font-semibold mb-2 ${category.categoryName === selectedCategory ? 'selected' : ''}`}

                            >
                                {category.categoryName}
                            </button>
                        </div>
                    </div>
                ))
                }
            </div>
        </div >
    );
};

export default InstitutesCategory;
