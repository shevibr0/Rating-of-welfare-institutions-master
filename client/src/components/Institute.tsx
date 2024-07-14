import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import _ from 'lodash';
import StarRating from './StarRating';
import Navbar from './Navbar';
const debounce = _.debounce;

const Institute = () => {
    const nav = useNavigate()
    const [searchValue, setSearchValue] = useState("")
    const [data, setData] = useState<InstituteData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hasImages, setHasImages] = useState<{ [key: string]: boolean }>({});
    const [numOfInstitutes, setNumOfInstitutes] = useState(0);
    const [data1, setData1] = useState<InstituteData | null>(null);



    interface InstituteData {
        _id: string;
        Misgeret_Id: number;
        Name: string;
        Type_Descr: string;
        Head_Department: String,
        Second_Classific: String,
        Owner_Code_Descr: String,
        Organization: String,
        ORGANIZATIONS_BUSINES_NUM: Number,
        Registered_Business_Id: Number,
        Authoritys: String,
        Authority_Id: Number,
        Region_Descr: String,
        Actual_Capacity: Number,
        Gender_Descr: String,
        Status_des: String,
        STARTD: String,
        Maneger_Name: String,
        Religion: String,
        Educate: String,
        City_Name: String,
        Adrees: String,
        Telephone: Number,
        Fax: String,
        Mailing_Box_Id: String,
        GisX: String,
        GisY: String,
        Target_Population_Descr: String,
        Rating: [{ userId: String, count: Number }],
        avgRating: { count: Number, sum: Number }
    }


    useEffect(() => {
        GetAllInstitutes()
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
            setNumOfInstitutes(data.count)
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

            const { data } = await axios.get("http://localhost:3000/institutes/getInstitutes/?limit=40")
            setData(data.institutes)
        } catch (error) {
            console.log("failed")
        }
    }
    const checkImages = async (id: any) => { // <-- Add 'async' here
        try {
            console.log("idd", id)
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
                <img className="mt-3 ml-5 w-[10px] mr-15 " src="/חץ חזור.svg" alt="Logo" onClick={() => nav("/soldiers")} />
            </div>
            <div>
                <span className="flex justify-center items-center  text-purple-700 text-4xl font-bold font-['Alef']"> {` לרשותכם ${numOfInstitutes} מסגרות רווחה בארץ `} </span>
                <div className='flex justify-center items-center'>
                    <a href='/institutesCategory' className="ml-5 mt-5 mb-5 text-purple-700 text-sm font-normal font-['Alef'] ">לחץ  כאן לחיפוש לפי קטגוריה </a>
                </div>
                <div className="flex justify-center items-center ml-8 mr-0">
                    <input onChange={(e) => {
                        setSearchValue(e.target.value);
                        debouncedSearch();

                    }}
                        value={searchValue}
                        type="search"
                        placeholder="חפש מסגרת"
                        dir="rtl"
                        className="mb-5 w-[700.75px] h-[40px] border-2 border-purple-500 bg-orange-100 px-4 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600 transition-all duration-300" />
                    <div className='flex items-center'>
                        <img className="mt-3 ml-5 max-w-[1%] lg:max-w-[1%] lg:mr-15  md:max-w-[1%] sm:max-w-[1%]" src="public/חיפוש.svg" alt="Logo" onClick={() => nav(-1)} />
                    </div>
                </div>

            </div>


            <div className="flex flex-wrap">
                {data.map((institute: any) => (
                    <div key={institute._id} className="w-full lg:w-1/4  md:w-1/2  px-4 mb-8">
                        <div className="bg-white rounded p-4 shadow-md border border-purple-400 hover:opacity-90  text-purple-700 hover:text-black hover:font-extrabold hover:bg-purple-400" style={{ direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <h2 className="text-xl font-semibold  font-['Alef'] mb-2 ">{institute.Name}</h2>
                            <ul className="list-none pl-0  text-purple-700  hover:text-black hover:font-extrabold">
                                <li className="mb-2">
                                    <p><span className='font-bold'>סוג המוסד</span>: {institute.Type_Descr}</p>
                                </li>
                                <li className="mb-2">
                                    <p><span className='font-bold'>שיוך למחלקה</span>: {institute.Head_Department}</p>
                                </li>
                                {/* <li className="mb-2">
                                <p className="text-orange-400">סמכות אחראית: {institute.Owner_Code_Descr}</p>
                            </li> */}
                                <li className="mb-2">
                                    <p><span className='font-bold'>שם הרשות המקומית</span>: {institute.Authoritys}</p>
                                </li>
                                <li className="mb-2">
                                    <p><span className='font-bold'>אזור</span>: {institute.Region_Descr}</p>
                                </li>
                                <li className="mb-2">
                                    <p><span className='font-bold'>עיר</span>: {institute.City_Name}</p>
                                </li>
                            </ul>
                            <StarRating averageRating={institute.avgRating.sum / institute.avgRating.count} />
                            {hasImages[institute._id] ? (
                                <img className="mt-3 ml-5 max-w-[6%]  mr-2 mb-3" src="/מצלמה מלא.svg" alt="Full Camera" onClick={() => nav(-1)} />
                            ) : (
                                <img className="mt-3 ml-5 max-w-[6%]  mr-2 mb-3" src="/מצלמה ריק.svg" alt="Empty Camera" onClick={() => nav(-1)} />
                            )}
                            <button className="font-semibold mb-2 mt-4 border border-purple-500 text-purple-500 p-2 rounded-md hover:opacity-80  hover:text-black hover:font-extrabold hover:border-black" onClick={() => nav(`/info/${institute._id}`)}>פרטים נוספים</button>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};


export default Institute
