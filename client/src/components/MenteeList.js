import React, { useState, useEffect } from 'react';
import { onSearchMentees } from '../api/functions'; // Import the API function
import Select from 'react-select';


function MenteeList({ onSelectMentees }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mentees, setMentees] = useState([]);
  const [selectedMentees, setSelectedMentees] = useState([]); // Define selectedMentees state
  const options = mentees.map((mentee) => ({
    value: mentee.user_id,
    label: mentee.username + " | " + "email: " + mentee.email,
  }));

  const handleChange = (newSelectedOptions) => {
    // Extract the user_id values from newSelectedOptions
    const selectedUserIds = newSelectedOptions.map(option => option.value);
  
    // Filter the mentees array to get the selected ones
    const selectedMentees = mentees.filter(mentee => selectedUserIds.includes(mentee.user_id));
  
    setSelectedMentees(selectedMentees);
    onSelectMentees(selectedMentees);
  };

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const response = await onSearchMentees(searchQuery);
        if (Array.isArray(response.data.mentees)) {
          setMentees(response.data.mentees);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching mentees:', error);
      }
    };
  
    fetchMentees();
  }, [searchQuery]);
  // Empty dependency array ensures this effect runs only once when the component mounts

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div >
      {/* <input type="text" placeholder="Search mentees by username or email" value={searchQuery} onChange={handleSearch} /> */}
       <Select 
      options={options}
      isMulti
      value={selectedMentees.map((mentee) => ({
        value: mentee.user_id,
        label: mentee.username + " | " + "email: " + mentee.email,
      }))}
      onChange={handleChange}
      placeholder="Select Mentees"
    />
    </div>
  );
}

export default MenteeList;
