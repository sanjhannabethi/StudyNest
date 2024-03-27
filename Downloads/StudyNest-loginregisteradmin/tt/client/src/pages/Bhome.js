import Layout from '../components/layout'
import React from 'react'
import Navbar from '../components/Bnavbar1'
import Sidebar from '../components/Bsidebar'
import TaskMonitor from '../components/Btask'

const Home = () => {
  return (
      <div>
        <Navbar />  
        <Sidebar />
        <TaskMonitor />
      </div>
  )
}

export default Home
