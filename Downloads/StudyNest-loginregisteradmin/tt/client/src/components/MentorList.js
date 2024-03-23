import React, { useState, useEffect } from 'react';
import { onSearchMentors } from '../api/functions'; // Import the API function
import Select from 'react-select';

function MentorList({ onSelectMentor }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null); // Define selectedMentor state

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await onSearchMentors(searchQuery);
        if (Array.isArray(response.data.mentors)) {
          setMentors(response.data.mentors);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    fetchMentors();
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChange = (selectedOption) => {
    setSelectedMentor(selectedOption); 
    // Set selectedMentor to the selected option
    onSelectMentor(selectedOption); // Pass the selected mentor to the parent component
  };

  const options = mentors.map((mentor) => ({
    value: mentor.user_id,
    label: `${mentor.username} | email: ${mentor.email}`,
  }));

  return (
    <div>
      <Select
        options={options}
        value={selectedMentor}
        onChange={handleChange}
        placeholder="Select Mentor..."
      />
    </div>
  );
}

export default MentorList;
