import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import StarRating from './StarRating';

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
const InstituteInfo: React.FC = () => {
  const nav = useNavigate()
  const [data, setData] = useState<InstituteData | null>(null);
  const params = useParams();
  const id = params["id"]
  useEffect(() => {
    onSearch(id);
  }, [])
  const onSearch = async (id: any) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/institutes/getInstitutesById?id=${id}`)
      console.log("hhhh", data)
      setData(data)

    } catch (error) {
      console.log("failed")
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-purple-100">
      {data && (
        <div className="bg-white p-8 rounded-lg shadow-md md:w-2/3 border-2 border-orange-400">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-800 text-center">פרטי המוסד</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <p className="mb-2">
              <span className="font-semibold">שם המוסד:</span> {data.Name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">מספר תעודת זהות:</span> {data.Misgeret_Id}
            </p>
            <p className="mb-2">
              <span className="font-semibold">סוג המוסד:</span> {data.Type_Descr}
            </p>
            <p className="mb-2">
              <span className="font-semibold">מחלקה ראשית: </span>{data.Head_Department}
            </p>
            {/* <li className="mb-2">
              <p>מחלקה שנייה: {data.Second_Classific}</p>
            </li> */}
            <p className="mb-2">
              <span className="font-semibold">קוד בעלים: </span>{data.Owner_Code_Descr}
            </p>
            {/* <li className="mb-2">
              <p>ארגון: {data.Organization}</p>
            </li> */}
            {/* <li className="mb-2">
              <p>מספר ארגוני: {data.ORGANIZATIONS_BUSINES_NUM.toString()}</p>
            </li> */}
            <p className="mb-2">
              <span className="font-semibold">מספר עסק: </span>{data.Registered_Business_Id.toString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">רשויות:</span> {data.Authoritys}
            </p>
            <p className="mb-2">
              <span className="font-semibold">קוד רשות: </span>{data.Authority_Id.toString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">אזור: </span>{data.Region_Descr}
            </p>
            <p className="mb-2">
              <span className="font-semibold">קיבולת נוכחית:</span> {data.Actual_Capacity.toString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">מגדר: </span>{data.Gender_Descr}
            </p>
            <p className="mb-2">
              <span className="font-semibold">סטטוס: </span>{data.Status_des}
            </p>
            <p className="mb-2">
              <span className="font-semibold">תאריך התחלה: </span>{data.STARTD}
            </p>
            <p className="mb-2">
              <span className="font-semibold">שם מנהל: </span>{data.Maneger_Name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">דת: </span>{data.Religion}
            </p>
            <p className="mb-2">
              <span className="font-semibold">השכלה: </span>{data.Educate}
            </p>
            <p className="mb-2">
              <span className="font-semibold">שם עיר:</span> {data.City_Name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">כתובת: </span>{data.Adrees}
            </p>
            <p className="mb-2">
              <span className="font-semibold">טלפון: </span>{data.Telephone.toString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">פקס:</span>{data.Fax}
            </p>
            <p className="mb-2">
              <span className="font-semibold">תיק דואר: </span>{data.Mailing_Box_Id}
            </p>
            {/* <li className="mb-2">
              <p>GisX: {data.GisX}</p>
            </li>
            <li className="mb-2">
              <p>GisY: {data.GisY}</p>
            </li> */}
            <p className="mb-2">
              <span className="font-semibold">אוכלוסיה יעד:</span> {data.Target_Population_Descr}
            </p>

            {/* <div className="mt-4">
              <p className="font-semibold">דירוג:</p>
              <ul>
                {data.Rating.map((rating, index) => (
                  <li key={index}>
                    <p>{`מזהה משתמש: ${rating.userId}, דירוג: ${rating.count}`}</p>
                  </li>
                ))}
              </ul>
            </div> */}
            <p className="mb-2">
              <span className="font-semibold">:דירוג ממוצע</span>
              {data.avgRating ? (
                <>
                  <p>{`כמות האנשים שדרגו: ${data.avgRating.count}, סכום הדירוגים: ${data.avgRating.sum}`}</p>
                  <h1>הממוצע הסופי</h1><StarRating averageRating={data.avgRating.sum / data.avgRating.count} />
                </>
              ) : (
                <p className="font-semibold">אין דירוג ממוצע זמין</p>
              )}
            </p>
            <button className="flex items-center font-semibold mb-2 mt-4 border border-purple-500 text-purple-500 p-2 rounded-md mx-auto" onClick={() => nav(`/info/${id}/rating`)}>
              נשמח שתדרג את המוסד
            </button>
            <button className="flex items-center font-semibold mb-2 mt-4 border border-purple-500 text-purple-500 p-2 rounded-md mx-auto" onClick={() => nav(`/info/${id}/previousComments`)}>
              לקריאת תגובות קודמות
            </button>
          </div>
        </div>

      )
      }

    </div >
  );
};


export default InstituteInfo
