import React from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import Cal from '../components/cal'
const Calender = () => {
  return (
    <div className='calender'>
        <Navbar/>
        <Sidebar/>
        <Cal/>
        

    </div>
  )
}

export default Calender