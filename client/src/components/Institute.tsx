import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import _ from 'lodash';
import StarRating from './StarRating';
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
