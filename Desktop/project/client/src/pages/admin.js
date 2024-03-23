import Layout from "../components/layout";
import React, { useEffect, useRef, useState } from 'react';
import MentorList from '../components/MentorList';
import MenteeList from '../components/MenteeList';
import GroupDisplay from '../components/GroupDisplay';
import { oncreateGroup } from "../api/functions";
import styled from 'styled-components';

const Admin = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedMentees, setSelectedMentees] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [refreshGroups, setRefreshGroups] = useState(false);

  const menteeListRef = useRef(null);

  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      if (menteeListRef.current) {
        menteeListRef.current.scrollTop = menteeListRef.current.scrollHeight;
      }
    }, 100);

    return () => clearTimeout(timeoutId); 
  }, [selectedMentees]);

  const createGroup = async () => {
    if (selectedMentor && selectedMentees.length > 0 && groupName.trim() !== '') {
      try {
        const groupData = {
          mentorId: selectedMentor.value,
          menteeIds: selectedMentees.map(mentee => mentee.user_id),
          groupName: groupName.trim(),
        };
        const response = await oncreateGroup(groupData);
        
        if (response.data.success) {
          setSuccess("Group created successfully.");
          setError('');
          setRefreshGroups(!refreshGroups);
        } else {
          setError(response.data.error || "Failed to create group.");
          setSuccess('');
        }
      } catch (error) {
        console.error("Error creating group:", error);
        setError("Failed to create group. Please try again later.");
        setSuccess('');
      }
    } else {
      setError("Please select a mentor, at least one mentee, and provide a group name to create a group.");
      setSuccess('');
    }
  };

  return (
    <Layout>
      <StyledDiv>
        {/* Left section */}
        <LeftPanel>
          <h1>Current Groups</h1>
          <div>
            <GroupDisplay refreshGroups={refreshGroups} />
          </div>
        </LeftPanel>

        {/* Right section */}
        <RightPanel ref={menteeListRef}>
          <h1>Create Group</h1>
          <div>
            <h2>Select Mentor :</h2>
            <MentorList onSelectMentor={setSelectedMentor} />
          </div>
          <div>
            <h2>Select Mentees :</h2>
            <MenteeList onSelectMentees={setSelectedMentees} />
          </div>
          <div>
            <h2>Group Name :</h2>
            <input 
              type="text" 
              value={groupName} 
              onChange={(e) => setGroupName(e.target.value)} 
              placeholder="Enter Group Name" 
              style={{ width: '100%' }} 
            />
          </div>
          <div style={{ color: 'red',margin: '10px 0' }}>{error}</div>
          <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>
          <button onClick={createGroup}>Create Group</button>
        </RightPanel>
      </StyledDiv>
    </Layout>
  );
}

export default Admin;

const StyledDiv = styled.div`
  display: flex;
  padding-top: 70px;
`;

const LeftPanel = styled.div`
  flex: 0 0 50vw;
  margin-right: 20px;
  height: 65vh;
  overflow: auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-bottom: 20px solid grey;
  border-radius: 10px;
  & h1 {
    font-weight: bold;
    font-size: 25px; 
  }
  & h2{
    font-size: 20px;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const RightPanel = styled.div`
  flex: 0.6;
  height: 65vh;
  overflow: auto;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f0f0f0;
  border-bottom: 20px solid grey;
  border-radius: 10px;
  & h1 {
    font-size: 20px;
    font-weight: bold;
  }
  & h2{
    padding-top: 20px;
    font-size: 20px;
  }
  & button{
    display: block;
    width: 100%;
    padding: 10px 20px;
    background-color: #283747;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 30px;
  
    &:hover {
      background-color: #17202A;
    }
  }
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
