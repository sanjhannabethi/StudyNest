import Layout from '../components/layout'
import React from 'react'
import Navbar from '../components/Anavbar1'
import Sidebar from '../components/Asidebar'
import TaskMonitor from '../components/Atask'

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
