import React from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import TaskMonitor from '../components/task'
const Home = () => {
  
  return (
    <div className='home'>
        <Navbar/>
        <Sidebar/>
        <TaskMonitor/>

    </div>
  )
}

export default Home