import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboard, faCalendar, faReview, faStar } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <ul className="nav-links1">
        <li className={location.pathname === '/home' ? 'active' : 'HomeIcon' }><Link to="/home"><FontAwesomeIcon icon={faHome} /></Link></li>
        <li className={location.pathname === '/assign' ? 'active' : 'HomeIcon'}><Link to="/assign"><FontAwesomeIcon icon={faClipboard} /></Link></li>
        <li className={location.pathname === '/calender' ? 'active' : 'HomeIcon' }><Link to="/calender"><FontAwesomeIcon icon={faCalendar} /></Link></li>
        <li className={location.pathname === '/review' ? 'active' : 'HomeIcon'}><Link to="/review"><FontAwesomeIcon icon={faStar} /></Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
