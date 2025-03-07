import React from 'react';
import searchIcon from '../assets/search_icon.svg';

const SearchFilter = () => {
  return (
    <div className='shadow-md shadow-red-300 py-2 px-10'>
        <div className='border flex items-center gap-1 border-gray-200 rounded-md py-1 px-2'>
            <img src={searchIcon} alt="" />
            <input className='outline-none w-full' type="text" placeholder='Type any job title' />
        </div>
        <div className='flex items-center justify-between py-4'>
            <button className='border border-gray-300 py-0.5 px-6 rounded text-sm text-gray-500'>Skills</button>
            <div className='flex items-center gap-3'>
                <button className='py-1 px-5 text-white text-sm rounded bg-red-400'>Apply Filter</button>
                <button className='border-0 bg-transparent text-red-400 text-sm font-medium'>Clear</button>
            </div>
        </div>
    </div>
  )
}

export default SearchFilter