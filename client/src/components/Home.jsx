import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllJobs } from '../api/api';
import Header from './Header';
import SearchFilter from './SearchFilter';
import JobCard from './JobCard';

const Home = () => {
  const [jobs,setJobs] = useState([]);
  const [loding,setLoading] = useState(false);
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

  const fetchAllJobs = async ()=>{
    try {
      const res = await getAllJobs();
      console.log(res)
      setJobs(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
      fetchAllJobs();
  },[])
  return (
    <div>
      <Header />
      <div className='lg:px-80 max-md:px-20 py-6'>
        <SearchFilter />
        {jobs.length > 0 && jobs.map(job=>{
          return (
            <JobCard key={job.id} job={job} />
          )
        })}
      </div>
    </div>
  )
}

export default Home