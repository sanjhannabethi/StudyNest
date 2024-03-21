import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboard, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <ul className="nav-links1">
        <li className={location.pathname === '/Home' ? 'active' : 'HomeIcon' }><Link to="/Home"><FontAwesomeIcon icon={faHome} /></Link></li>
        <li className={location.pathname === '/assign' ? 'active' : 'HomeIcon'}><Link to="/assign"><FontAwesomeIcon icon={faClipboard} /></Link></li>
        <li><FontAwesomeIcon icon={faCalendar} /></li>
        {/* <li className={location.pathname === '/profile' ? 'active' : 'HomeIcon'}><Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link></li> */}
      </ul>
    </nav>
  );
}

export default Sidebar;
