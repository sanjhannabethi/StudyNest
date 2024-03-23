import React, { useState, useEffect } from 'react';
import { getUserRole } from '../api/auth'; // Import the function to get user role
import Admin from './admin'; // Import the Admin component
import NonAdminPage from './nonadminpage'; // Import the page/component for non-admin users



function Userrole() {
  const [userRole, setUserRole] = useState(null); // State to store user role

  useEffect(() => {
    // Fetch user role when the component mounts
    const fetchUserRole = async () => {
      try {
        const data = await getUserRole(); 
        // Assuming this function fetches the user's role from the backend
        setUserRole(data.data.role); // Set the user's role in state
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole(); // Call the fetchUserRole function
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      {/* Conditional rendering based on user role */}
      {userRole === 'Admin' ? <Admin /> : <NonAdminPage />}
    </div>
  );
}

export default Userrole;
