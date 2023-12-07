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
      <label>חיפוש</label><br />
      <input onChange={e => setSearchValue(e.target.value)} type="search" placeholder='search' />
      <div>select categories</div>
      <Institute data={data} />
    </div>
    // {/* <Intersector width={500} height={500} background={"red"} /> */ }
  )
}
export default Institutes
