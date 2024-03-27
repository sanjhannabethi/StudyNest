import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboard, faCalendar, faReview, faStar } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const BSidebar = () => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <ul className="nav-links1">
        <li className={location.pathname === '/Bhome' ? 'active' : 'HomeIcon' }><Link to="/Bhome"><FontAwesomeIcon icon={faHome} /></Link></li>
        {/* <li className={location.pathname === '/Bassign' ? 'active' : 'HomeIcon'}><Link to="/Bassign"><FontAwesomeIcon icon={faClipboard} /></Link></li> */}
        <li className={location.pathname === '/Bcalender' ? 'active' : 'HomeIcon' }><Link to="/Bcalender"><FontAwesomeIcon icon={faCalendar} /></Link></li>
        <li className={location.pathname === '/Breview' ? 'active' : 'HomeIcon'}><Link to="/Breview"><FontAwesomeIcon icon={faStar} /></Link></li>
      </ul>
    </nav>
  );
}

export default BSidebar;
