import React from 'react'
import { useParams } from 'react-router';

const InstituteInfo = () => {
  const params = useParams();
  const id = params["id"]
  return (
    <div>
      <div key={id} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
        <div className="bg-white rounded p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">{institute.Name}</h2>
          <ul className="list-none pl-0">
            <li className="mb-2">
              <p>Misgeret_Id: {institute.Misgeret_Id}</p>
            </li>
            <li className="mb-2">
              <p>Type: {institute.Type_Descr}</p>
            </li>
            <li className="mb-2">
              <p>Head Department: {institute.Head_Department}</p>
            </li>
            <li className="mb-2">
              <p>Second_Classific: {institute.Second_Classific}</p>
            </li>
            <li className="mb-2">
              <p>Owner_Code_Descr: {institute.Owner_Code_Descr}</p>
            </li>
            <li className="mb-2">
              <p>Organization: {institute.Organization}</p>
            </li>
            <li className="mb-2">
              <p>ORGANIZATIONS_BUSINES_NUM: {institute.ORGANIZATIONS_BUSINES_NUM}</p>
            </li>
            <li className="mb-2">
              <p>Registered_Business_Id: {institute.Registered_Business_Id}</p>
            </li>
            <li className="mb-2">
              <p>Authoritys: {institute.Authoritys}</p>
            </li>
            <li className="mb-2">
              <p>Authority_Id: {institute.Authority_Id}</p>
            </li>
            <li className="mb-2">
              <p>Region_Descr: {institute.Region_Descr}</p>
            </li>
            <p>Actual_Capacity: {institute.Actual_Capacity}</p>
            <p>Gender_Descr: {institute.Gender_Descr}</p>
            <p>Head Department: {institute.Head_Department}</p>
            <p>From_Age: {institute.From_Age}</p>
            <p>To_Age: {institute.To_Age}</p>
            <p>Status_des: {institute.Status_des}</p>
            <p>STARTD: {institute.STARTD}</p>
            <p>Maneger_Name: {institute.Maneger_Name}</p>
            <p>Religion: {institute.Religion}</p>
            <p>Educate: {institute.Educate}</p>
            <p>City_Name: {institute.City_Name}</p>
            <p>Adrees: {institute.Adrees}</p>
            <p>Telephone: {institute.Telephone}</p>
            <p>Fax: {institute.Fax}</p>
            <p>Mailing_Box_Id: {institute.Mailing_Box_Id}</p>
            <p>GisX: {institute.GisX}</p>
            <p>GisY: {institute.GisY}</p>
            <p>Target_Population_Descr: {institute.Target_Population_Descr}</p>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InstituteInfo
