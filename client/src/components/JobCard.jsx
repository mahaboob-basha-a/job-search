import React from 'react';
import companyIcon from '../assets/company_icon.svg'
import moneyIcon from '../assets/money_icon.svg'

const JobCard = ({job}) => {
  return (
    <div className='flex justify-between items-center py-8 my-8 px-5 shadow-md shadow-red-200'>
        <div className='flex items-center gap-4'>
            <img src={companyIcon} className='rounded-md w-8' alt="" />
            <div>
                <h2 className='text-sm text-black font-medium'>{job.title}</h2>
                <div className='flex items-center justify-between py-2'>
                    <div className='flex items-center'>
                        <img src={moneyIcon} alt="" />
                        <span className='text-xs text-gray-500'>{job.salary}</span>
                    </div>
                    <span className='text-gray-500 text-sm'>{job.location}</span>
                </div>
            </div>
        </div>
        <div>
            <div className='flex items-center gap-2'>
                <span className='py-1 px-2 rounded bg-red-100 text-black text-xs'>Frontend</span>
                <span className='py-1 px-2 rounded bg-red-100 text-black text-xs'>Html</span>
                <span className='py-1 px-2 rounded bg-red-100 text-black text-xs'>Css</span>
            </div>
            <button className='py-1 px-5 my-3 text-white text-sm rounded bg-red-400'>View details</button>
        </div>
    </div>
  )
}

export default JobCard;