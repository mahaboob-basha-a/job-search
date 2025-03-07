import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './components/Auth'
import {ToastContainer} from 'react-toastify'
import Home from './components/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App