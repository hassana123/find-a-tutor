import React from 'react'
import {  BiFilterAlt, BiSearchAlt2 } from 'react-icons/bi';
const SearchComponent = () => {
  return (
    <section className='my-8 mx-5 gap-3 flex items-center'>
        <div className='border w-[85%]  px-5 bg-white rounded-md  flex items-center'>
      <BiSearchAlt2 size={20}/>
      <input className='w-[100%] bg-transparent border-none outline-none py-3 px-2' placeholder="Search for a Tutor here" type="text" />
    </div>
    <BiFilterAlt size={30} />
    </section>
  )
}

export default SearchComponent
