
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/home'
import Assign from './Pages/assign'
import Calender from './Pages/calender'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' exact element={<Home />} />
        <Route path='/assign' exact element={<Assign />} />
        <Route path='/calender' exact element={<Calender />} />
       
      </Routes>
    </Router>
  );
}

export default App;