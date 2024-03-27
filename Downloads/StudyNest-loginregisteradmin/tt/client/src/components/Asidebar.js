import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboard, faCalendar, faReview, faStar } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const ASidebar = () => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <ul className="nav-links1">
        {/* <li className={location.pathname === '/Ahome' ? 'active' : 'HomeIcon' }><Link to="/Ahome"><FontAwesomeIcon icon={faClipboard} /></Link></li> */}
        <li className={location.pathname === '/Aassign' ? 'active' : 'HomeIcon'}><Link to="/Aassign"><FontAwesomeIcon icon={faClipboard} /></Link></li>
        <li className={location.pathname === '/Acalender' ? 'active' : 'HomeIcon' }><Link to="/Acalender"><FontAwesomeIcon icon={faCalendar} /></Link></li>
        <li className={location.pathname === '/Areview' ? 'active' : 'HomeIcon'}><Link to="/Areview"><FontAwesomeIcon icon={faStar} /></Link></li>
      </ul>
    </nav>
  );
}

export default ASidebar;
