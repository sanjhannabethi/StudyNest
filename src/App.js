
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Assign from './pages/assign'
import Profile from './pages/profile'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' exact element={<Home />} />
        <Route path='/assign' exact element={<Assign />} />
        <Route path='/profile' exact element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
