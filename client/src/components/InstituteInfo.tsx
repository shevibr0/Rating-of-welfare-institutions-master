import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import StarRating from './StarRating';


const InstituteInfo = () => {
  const nav = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<InstituteData | null>(null);
  const params = useParams();
  const id = params["id"]




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
    avgRating: { count: any, sum: any }
  }
  useEffect(() => {
    onSearch(id);
  }, [])
  const onSearch = async (id: any) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/institutes/getInstitutesById?id=${id}`)
      console.log("hhhhw", data)
      setData(data)

    } catch (error) {
      console.log("failed")
    }
  }
  return (
    <div className="bg-orange-100 h-screen">
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
        <img className="mt-2 lg:hidden md:hidden sm:hidden max-w-[25%]" src="/לוגו.svg" alt="Logo" />

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


      <div className="flex justify-around items-center ">
        {data && (
          <div className="justify-center cursor-pointer">
            <h2 className="text-3xl font-bold mb-7 text-purple-600 text-center ">פרטי המוסד</h2>
            <div className="grid lg:grid-cols-4 lg:gap-4 md:gap-1 md:mr-7 md:grid-cols-3 sm:gap-1   sm:grid-cols-1 gap-3 ml-2 mr-2 text-center">
              <div className="bg-white w-[267.20px] h-[40px] text-center shadow border border-purple-500 border-opacity-50  rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Name}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:שם המוסד</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Misgeret_Id}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:מספר תעודת זהות</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Type_Descr}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:סוג המוסד</p>
                </div>
              </div>


              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Head_Department}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:מחלקה ראשית</p>
                </div>
              </div>


              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Owner_Code_Descr}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:קוד בעלים</p>
                </div>
              </div>



              {/* <li className="mb-2">
              <p>מספר ארגוני: {data.ORGANIZATIONS_BUSINES_NUM.toString()}</p>
            </li> */}


              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Authoritys}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:רשויות</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Authority_Id.toString()}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:קוד רשות</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Region_Descr}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:אזור</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Actual_Capacity.toString()}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:קיבולת נוכחית</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Gender_Descr}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:מגדר</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Status_des}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:סטטוס</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.STARTD}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:תאריך התחלה</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Maneger_Name}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:שם מנהל</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Religion}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:דת</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Educate}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:השכלה</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.City_Name}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:שם עיר</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="items-center flex  justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Adrees}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:כתובת</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50 rounded">
                <div className="flex items-center justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Telephone.toString()}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:טלפון</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px] shadow border border-purple-500 border-opacity-50  rounded">
                <div className="flex  items-center justify-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Fax}</p>
                  <p className="text-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:פקס</p>
                </div>
              </div>

              <div className="bg-white w-[267.20px] h-[40px]  shadow border border-purple-500 border-opacity-50 rounded">
                <div className="flex justify-center items-center">
                  <p className="text-center text-purple-500 text-base font-normal font-['Alef'] leading-[37.23px] mr-1"> {data.Target_Population_Descr}</p>
                  <p className="text-center justify-center text-purple-500 text-[23.16px] font-bold font-['Alef']">:אוכלוסיית יעד</p>
                </div>
              </div>

            </div>
          </div>

        )
        }
      </div>
      <div className='flex flex-wrap justify-center lg:mt-8 lg:mb-4 md:mx-1 md:mt-6 md:mb-6 sm:mt-4 sm:mb-4 sm:gap-3 gap-4 mt-4 mb-4 ml-1  '>
        <div className="bg-purple-500 w-[267.20px] h-[40px] shadow border-2 border-purple-500 border-opacity-50" onClick={() => nav(`/info/${id}/previousComments`)}>
          <div className="px-4 py-0 flex  justify-center">
            <p className="text-center text-white text-base font-normal font-['Alef'] leading-[37.23px] mr-1"></p>
            <p className="text-center text-white text-[23.16px] font-bold font-['Alef']">תגובות קודמות</p>
          </div>
        </div>
        <div className="bg-purple-500 w-[267.20px] h-[40px] shadow border-2 border-purple-500 border-opacity-50 mr-2 ml-2" onClick={() => nav(`/info/${id}/pictures`)}>
          <div className="px-4 py-0 flex  justify-center">
            <p className="text-center text-white  text-base font-normal font-['Alef'] leading-[37.23px] mr-1"></p>
            <p className="text-center text-white  text-[23.16px] font-bold font-['Alef']">תמונות המסגרת</p>
          </div>
        </div>
        <div className="bg-purple-500 w-[267.20px] h-[40px] shadow border-2 border-purple-500 border-opacity-50" onClick={() => nav(`/info/${id}/rating`)}>
          <div className="px-4 py-0 flex  justify-center">
            <p className="text-center text-white  text-base font-normal font-['Alef'] leading-[37.23px] mr-1"></p>
            <button className="text-center text-white  text-[23.16px] font-bold font-['Alef']">דרגו אותי</button>
          </div>
        </div>
      </div>
      <div>
        <div className="text-purple-500  font-bold font-['Alef'] leading-[37.23px] lg:flex md:flex sm:flex  justify-center mt-6 text-center">
          <p className=''>{`מספר אנשים שדירגו את המוסד: ${data?.avgRating.count}`}</p>
          <div className='ml-9 mr-9'>
            <StarRating averageRating={data?.avgRating.sum / data?.avgRating.count} />
          </div>
          <p className='mr-7'>{`דירוג המוסד :${data?.avgRating.sum / data?.avgRating.count}`}</p>
        </div>
      </div>
      <div className="text-center text-red-600 text-base font-normal font-['Alef'] leading-[37.23px] mt-3 bottom-0">“התגובות עוברות בקרה במידה ויש לכם הערה או בקשה נא לפנות אלי  <span className='underline font-bold cursor-pointer' onClick={() => nav('/contact')}>בפרטי</span>”</div>

    </div>
  );
};


export default InstituteInfo
