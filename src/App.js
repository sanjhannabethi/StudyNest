
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Assign from './pages/assign'
import Profile from './pages/profile'
import Calender from './pages/calender'
import Review from './pages/review'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' exact element={<Home />} />
        <Route path='/assign' exact element={<Assign />} />
        <Route path='/calender' exact element={<Calender />} />
        <Route path='/profile' exact element={<Profile />} />
        <Route path='/review' exact element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
