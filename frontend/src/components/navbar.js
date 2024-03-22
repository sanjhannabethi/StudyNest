import React, { useState } from 'react';
import './index.css';
import profileAvatar from '../pages/profile-avatar.png'; 
import { Link ,useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTimes ,faGraduationCap} from '@fortawesome/free-solid-svg-icons'; // Added faTimes icon for the close button

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const getLogoText = (path) => {
    switch (path) {
      case '/home':
        return 'Task Monitor';
      case '/assign':
        return 'Assignment';
      default:
        return 'Task Monitor';
    }
  };
  const logo = getLogoText(location.pathname);

  return (
    <nav className="navbar">
      <div className="container">
      <div className="logos">
          <div className="logo1">
          <FontAwesomeIcon icon={faGraduationCap} className="logo-icon" />
          </div>
         <div className="logo">{logo}</div>
      </div>
        <ul className="nav-links">
          <li><a href="#">Shrutika</a></li>
          <li>
            <button onClick={toggleProfilePopup}>
              <FontAwesomeIcon icon={faUser} />
            </button>
          </li>
        </ul>
      </div>
      {/* Profile Popup */}
      {isProfileOpen && (
        <div className="profile-popup-background">
          <div className="profile-card">
            <button className="close-button" onClick={toggleProfilePopup}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2>User Profile</h2>
            <img src={profileAvatar} alt="Profile Avatar" className="profile-avatar" />
            <p className="name">Shrutika Rathi</p>
            <p>Group ID: <span>1</span></p>
            <h5>Mentor Name: XYZ</h5>
            <h4>Other Group Members</h4>
            <p>A</p>
            <p>B</p>
            <p>C</p>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;