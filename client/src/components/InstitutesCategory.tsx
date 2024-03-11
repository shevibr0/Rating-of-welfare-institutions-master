import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import axios from 'axios';

const debounce = _.debounce;

const InstitutesCategory = () => {
    const nav = useNavigate();
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
        <div className="flex flex-wrap">
            <div className="w-full px-4 mb-8 flex items-center justify-center">
                <button onClick={() => nav('/institutes')}>בחר את כל המוסדות הרווחה בארץ</button>

            </div>
            {dataCategory.map((category: any) => (
                <div key={category._id} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
                    <div
                        className="bg-white rounded p-4 shadow-md border border-purple-400"
                        style={{ direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                    >
                        <button
                            onClick={() => {

                                nav(`/institutesCategory/${category.categoryName}`);
                            }} className={`text-xl font-semibold mb-2 text-purple-700 ${category.categoryName === selectedCategory ? 'selected' : ''}`}

                        >
                            {category.categoryName}
                        </button>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default InstitutesCategory;
