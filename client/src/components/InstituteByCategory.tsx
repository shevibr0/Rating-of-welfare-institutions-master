import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import _ from 'lodash';
import StarRating from './StarRating';
import Navbar from './Navbar';

const InstituteByCategory = () => {
    const nav = useNavigate();
    const [institutes, setInstitutes] = useState([]);
    const [searchValue, setSearchValue] = useState("")
    const params = useParams();
    const name = params["id"]
    const [hasImages, setHasImages] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        fetchInstitutesByCategory(searchValue)

    }, []);


    useEffect(() => {

        searchInstitutesByCategory()
    }, [searchValue]);



    const fetchInstitutesByCategory = async (categoryName: any) => {
        try {
            const { data } = await axios.get(`http://localhost:3000/institutes/getByCategories?category=${categoryName}&limit=12000`);
            setInstitutes(data.institutes);
        } catch (error) {
            console.log('Failed to fetch institutes by category', error);
        }
    };
    const searchInstitutesByCategory = async () => {
        try {

            const { data } = await axios.get(`http://localhost:3000/institutes/searchByCategory`, {
                params: {
                    limit: 120,
                    search: searchValue,
                    category: name, // Pass the category to the server
                },
            });
            console.log('Response from server:', data);
            setInstitutes(data.institutes);
        } catch (error) {
            console.log('Failed to fetch institutes by category', error);
        }
    };

    return (
        <div className="bg-orange-100 h-screen">
            <Navbar />
            <div className='flex items-center'>
                <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15  md:max-w-[1%] sm:max-w-[1%]" src="/חץ חזור.svg" alt="Logo" onClick={() => nav(-1)} />
            </div>
            <div className="bg-orange-100">
                <div className="text-center mb-4">
                    <div className="relative flex items-center justify-center">
                        <input onChange={(e) => {
                            setSearchValue(e.target.value);
                            debouncedSearch();
                        }}
                            value={searchValue}
                            type="search"
                            placeholder="חפש מסגרת"
                            dir="rtl"
                            className="border border-purple-700 pl-10 pr-4 py-2 rounded-md" />
                    </div>
                </div>

            </div>
            <div className='ml-2 mr-2 text-purple-700 bg-red-100'>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-2 text-center w-full">
                    {institutes.map((institute: any) => (
                        <div key={institute._id} className="bg-white text-center shadow shadow-purple-700 p-4 rounded-2xl hover:animate-button-push hover:shadow hover:shadow-gray-700">
                            <h2 className="text-lg font-bold mb-2">{institute.Name}</h2>
                            <ul className="list-none pl-0 text-purple-700">
                                <li className="mb-2">
                                    <p>
                                        {/* <span className='font-bold'>סוג המוסד</span> */}
                                        {institute.Type_Descr}</p>
                                </li>
                                <li className="mb-2">
                                    <p>
                                        {/* <span className='font-bold'>שיוך למחלקה</span> */}
                                        {institute.Head_Department}</p>
                                </li>
                                <li className="mb-2">
                                    <p><span className='font-bold'>רשות</span> {institute.Authoritys}</p>
                                </li>
                                <li className="mb-2">
                                    <p><span className='font-bold'>אזור</span> {institute.Region_Descr}</p>
                                </li>
                                <li className="mb-2">
                                    <p><span className='font-bold'>עיר</span> {institute.City_Name}</p>
                                </li>
                            </ul>
                            <StarRating averageRating={institute.avgRating.sum / institute.avgRating.count} />
                            <div className="flex flex-col items-center mt-3 ml-5 mr-2 mb-3">
                                {hasImages[institute._id] ? (
                                    <img className="max-w-[6%]" src="/מצלמה מלא.svg" alt="Full Camera" onClick={() => nav(-1)} />
                                ) : (
                                    <img className="max-w-[6%]" src="/מצלמה ריק.svg" alt="Empty Camera" onClick={() => nav(-1)} />
                                )}
                            </div>
                            <button className="btn bg-red-200 font-bold text-purple-700 py-2 px-4 rounded-xl hover:animate-button-push" onClick={() => nav(`/info/${institute._id}`)}>פרטים נוספים</button>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default InstituteByCategory;
