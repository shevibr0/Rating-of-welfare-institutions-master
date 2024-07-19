import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Navbar from './Navbar';

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
            <Navbar />
            <div className='flex items-center'>
                <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15  md:max-w-[1%] sm:max-w-[1%]" src="public/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
            </div>
            <span className="flex justify-center items-center text-purple-700 text-2xl font-bold">חפש מסגרת לפי קטגוריה</span>
            <div className='flex justify-center items-center'>
                <a href='/institutes' className="ml-5 mt-5 mb-5 text-purple-700 text-sm font-normal">לחיפוש חופשי לחץ כאן </a>
            </div>

            <div className="flex flex-wrap">
                {dataCategory.map((category: any) => (
                    <div key={category._id} className="w-full sm:w-1/2  md:w-1/3 lg:w-1/5 px-2 mb-2  hover:animate-button-push">
                        <div onClick={() => {
                            nav(`/institutesCategory/${category.categoryName}`);
                        }} className="bg-white rounded-xl p-2   shadow-md border border-purple-300  text-purple-700"
                            style={{ direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <div>
                                <button onClick={() => {
                                    nav(`/institutesCategory/${category.categoryName}`);
                                }} className={`text-base font-semibold  ${category.categoryName === selectedCategory ? 'selected' : ''}`}

                                >
                                    {category.categoryName}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div >
    );
};

export default InstitutesCategory;
