import axios from 'axios'
import { useLazyLoading } from 'mg-js'
import React, { useState, useEffect } from 'react'
import Institute from './Institute'

const Institutes = () => {
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    onSearch();
  }, [])
  // const [Intersector, institutes, setInstitutes] = useLazyLoading({}, async () => {
  const onSearch = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/institutes/getInstitutes/?limit=180")
      //"http://localhost:3000/institutes/search/?limit=4&search=מגדים"
      console.log(data)
      setData(data.institutes)
    } catch (error) {
      console.log("failed")
    }
  }
  //})

  return (

    <div>
      <input className="w-[756px] h-[51px] bg-white border-2 border-amber-500" onChange={e => setSearchValue(e.target.value)} type="search" placeholder='חיפוש מוסד' />
      <Institute data={data} />
    </div>
    // {/* <Intersector width={500} height={500} background={"red"} /> */ }
  )
}
export default Institutes
