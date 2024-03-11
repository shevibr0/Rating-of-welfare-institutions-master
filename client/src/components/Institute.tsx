import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import _ from 'lodash';
const debounce = _.debounce;

const Institute = () => {
    const nav = useNavigate()
    const [searchValue, setSearchValue] = useState("")
    const [data, setData] = useState([])


    useEffect(() => {
        GetAllInstitutes()
        onSearch();
    }, [searchValue]);

    const onSearch = async () => {
        try {

            const encodedSearchValue = encodeURIComponent(searchValue);
            const { data } = await axios.get(`http://localhost:3000/institutes/search/?limit=120&search=${encodedSearchValue}`);
            setData(data.institutes);
        } catch (error) {
            console.log('failed');
        }
    };


    const debouncedSearch = _.debounce(onSearch, 300);
    const GetAllInstitutes = async () => {
        try {

            const { data } = await axios.get("http://localhost:3000/institutes/getInstitutes/?limit=40")
            setData(data.institutes)
        } catch (error) {
            console.log("failed")
        }
    }


    return (
        <div className="flex flex-wrap">
            <div className="w-full px-4 mb-8 flex items-center justify-center">

                <button onClick={() => nav('/institutesCategory')}>חפש לפי קטגוריות</button>

                <input
                    className="w-[756px] h-[51px] bg-white border-2 border-amber-500"
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        debouncedSearch();

                    }}
                    value={searchValue}
                    type="search"
                    placeholder="חיפוש לפי איזה קטגוריה שתבחר שם/עיר/דת/אזור"
                    dir="rtl"
                />
            </div>
            {data.map((institute: any) => (
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
                            {/* <li className="mb-2">
                                <p className="text-orange-400">סמכות אחראית: {institute.Owner_Code_Descr}</p>
                            </li> */}
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


export default Institute
