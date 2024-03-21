import React from 'react';
import profileAvatar from '../pages/profile-avatar.png'; // Import the profile avatar image

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
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
  );
}

export default Profile;
