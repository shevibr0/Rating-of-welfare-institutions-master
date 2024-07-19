import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import _ from 'lodash';
import StarRating from './StarRating';
import Navbar from './Navbar';
const debounce = _.debounce;

const Institute = () => {
    const nav = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState<InstituteData[]>([]);
    const [hasImages, setHasImages] = useState<{ [key: string]: boolean }>({});
    const [numOfInstitutes, setNumOfInstitutes] = useState(0);
    const [data1, setData1] = useState<InstituteData | null>(null);
    const [loading, setLoading] = useState(false);

    interface InstituteData {
        _id: string;
        Misgeret_Id: number;
        Name: string;
        Type_Descr: string;
        Head_Department: string,
        Second_Classific: string,
        Owner_Code_Descr: string,
        Organization: string,
        ORGANIZATIONS_BUSINES_NUM: number,
        Registered_Business_Id: number,
        Authoritys: string,
        Authority_Id: number,
        Region_Descr: string,
        Actual_Capacity: number,
        Gender_Descr: string,
        Status_des: string,
        STARTD: string,
        Maneger_Name: string,
        Religion: string,
        Educate: string,
        City_Name: string,
        Adrees: string,
        Telephone: number,
        Fax: string,
        Mailing_Box_Id: string,
        GisX: string,
        GisY: string,
        Target_Population_Descr: string,
        Rating: [{ userId: string, count: number }],
        avgRating: { count: number, sum: number }
    }

    useEffect(() => {
        GetAllInstitutes();
        onSearch();
    }, [searchValue]);

    useEffect(() => {
        const fetchData = async () => {
            GetNumOfInstitutes();
            const imagesMap: { [key: string]: boolean } = {};
            for (const institute of data) {
                try {
                    const id = institute._id; // Get the ID of the current institute
                    console.log("Checking images for institute with ID:", id);
                    imagesMap[id] = await checkImages(id);
                } catch (error) {
                    console.error("Error checking images for institute with ID:", institute._id, error);
                    imagesMap[institute._id] = false; // Set the image status to false if an error occurs
                }
            }
            setHasImages(imagesMap);
        };
        fetchData();
    }, [data]);

    const GetNumOfInstitutes = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/institutes/getInstitutesCount`);
            setNumOfInstitutes(data.count);
        } catch (error) {
            console.log('failed');
        }
    };

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
            const { data } = await axios.get("http://localhost:3000/institutes/getInstitutes/?limit=40");
            setData(data.institutes);
        } catch (error) {
            console.log("failed");
        }
    };

    const checkImages = async (id: any) => { // <-- Add 'async' here
        try {
            console.log("idd", id);
            const response = await fetch(`http://localhost:3000/hasImages/?institutId=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const data = await response.json();
            return data.hasImages; // Assuming the server returns { hasImages: true/false }
        } catch (error) {
            console.error('Error checking images:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <div className="bg-orange-100 h-screen">
            <Navbar />
            <div className='flex items-center mb-1'>
                <img className="mt-3 ml-5 w-[10px] mr-15" src="/חץ חזור.svg" alt="Logo" onClick={() => nav("/soldiers")} />
            </div>
            <div>
                <span className="flex justify-center items-center text-purple-700 text-2xl font-bold"> {`לרשותכם ${numOfInstitutes} מסגרות רווחה בארץ `} </span>
                <div className='flex justify-center items-center'>
                    <a href='/institutesCategory' className="ml-5 mt-5 mb-5 text-purple-700 text-sm font-normal">לחץ  כאן לחיפוש לפי קטגוריה </a>
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
                    <div className='flex items-center'>
                        <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15 md:max-w-[1%] sm:max-w-[1%]" src="public/חיפוש.svg" alt="Logo" onClick={() => nav(-1)} />
                    </div>
                </div>
            </div>
            <div className='ml-2 mr-2 text-purple-700 bg-red-100'>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-2 text-center w-full">
                    {data.map((institute: any) => (
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
        </div>
    );
};

export default Institute;
