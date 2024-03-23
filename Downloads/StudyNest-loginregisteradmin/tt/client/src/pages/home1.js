import React from 'react'
import Navbar from '../components/navbar1'
import Sidebar from '../components/sidebar'
import TaskMonitor from '../components/task'
const Home1 = () => {
  
  return (
    <div className='home'>
        <Navbar/>
        <Sidebar/>
        <TaskMonitor/>
    </div>
  )
}

export default Home1