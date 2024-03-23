import './index.css';
import profileAvatar from '../pages/profile-avatar.png'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTimes ,faGraduationCap} from '@fortawesome/free-solid-svg-icons'; // Added faTimes icon for the close button
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/layout'
import { unauthenticateUser } from '../redux/slices/authSlice'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const getLogoText = (path) => {
    switch (path) {
      case '/home':
        return 'Task Monitor';
      case '/assign':
        return 'Assignment';
      case '/calender':
          return 'Meeting Scheduler';
      case '/review':
        return 'Review and Feedback';
      default:
        return 'Task Monitor';
    }
  };
  const logo = getLogoText(location.pathname);

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
      navigate('/login'); // Navigate to /login route
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.info)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  }, [])

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
          <li>
            <button onClick={() => logout()} className='btn btn-primary'>
            Logout
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
