import Layout from '../components/layout'
import React from 'react'
import Navbar from '../components/navbar1'
import Sidebar from '../components/sidebar'
import TaskMonitor from '../components/task'

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
