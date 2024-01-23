import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import _ from 'lodash';

const InstituteByCategory = () => {
    const nav = useNavigate();
    const [institutes, setInstitutes] = useState([]);
    const [searchValue, setSearchValue] = useState("")
    const [page, setPage] = useState(1); // Track the current page
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const name = params["id"]
    useEffect(() => {
        // Call the function to fetch and display institutes based on the selected category
        console.log("name", name)
        loadMoreData()

    }, []);
    useEffect(() => {
        // Call the function to fetch and display institutes based on the selected category

        searchInstitutesByCategory()
    }, [searchValue]);

    useEffect(() => {
        // Add a scroll event listener to trigger loading more data
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScroll = () => {
        // Check if the user has scrolled to the bottom
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            // Load more data when the user reaches the bottom
            loadMoreData();
        }
    };

    const loadMoreData = async () => {
        if (!loading) {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:3000/institutes/getByCategories?category=${name}&limit=12&page=${page + 1}`);
                setInstitutes((prevInstitutes) => [...prevInstitutes, ...data.institutes]);
                setPage((prevPage) => prevPage + 1);
            } catch (error) {
                console.log('Failed to fetch more institutes', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const fetchInstitutesByCategory = async (categoryName: any) => {
        try {
            const { data } = await axios.get(`http://localhost:3000/institutes/getByCategories?category=${categoryName}&limit=140`);
            setInstitutes(data.institutes);
        } catch (error) {
            console.log('Failed to fetch institutes by category', error);
        }
    };
    const searchInstitutesByCategory = async () => {
        try {

            const { data } = await axios.get(`http://localhost:3000/institutes/searchByCategory`, {
                params: {
                    limit: 12,
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
        <div className="flex flex-wrap -mx-4">

            <div className="w-full px-4 mb-8 flex items-center justify-center">
                <input
                    className="w-[756px] h-[51px] bg-white border-2 border-amber-500"
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        searchInstitutesByCategory();
                        // Call the debounced search function as the user types
                    }}
                    type="search"
                    placeholder={`בצע חיפוש בתוך הקטגוריה ${name}`}
                    dir="rtl"
                />
            </div>
            {institutes.map((institute: any) => (
                <div key={institute._id} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
                    <div className="bg-white rounded p-4 shadow-md border border-purple-400" style={{ direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <h2 className="text-xl font-semibold mb-2 text-purple-700">{institute.Name}</h2>
                        <ul className="list-none pl-0">
                            <li className="mb-2">
                                <p className="text-orange-400">סוג המוסד: {institute.Type_Descr}</p>
                            </li>
                            <li className="mb-2">
                                <p className="text-orange-400">שיוך מחלקה: {institute.Head_Department}</p>
                            </li>
                            <li className="mb-2">
                                <p className="text-orange-400">סמכות אחראית: {institute.Owner_Code_Descr}</p>
                            </li>
                            <li className="mb-2">
                                <p className="text-orange-400">שם הרשות המקומית: {institute.Authoritys}</p>
                            </li>
                            <li className="mb-2">
                                <p className="text-orange-400">אזור: {institute.Region_Descr}</p>
                            </li>
                            <li className="mb-2">
                                <p className="text-orange-400">עיר: {institute.City_Name}</p>
                            </li>
                        </ul>
                        <button className="font-semibold mb-2 mt-4 border border-purple-500 text-purple-500 p-2 rounded-md" onClick={() => nav(`/info/${institute._id}`)}>פרטים נוספים</button>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default InstituteByCategory;
