import React, { useState, useEffect } from 'react';
import { ongetGroups } from '../api/functions';
import styled from 'styled-components';

function GroupDisplay({ refreshGroups }) {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await ongetGroups();
        if (response.data.success) {
          setGroups(response.data.groups);
        } else {
          setError(response.data.error || 'Failed to fetch groups.');
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
        setError('Failed to fetch groups. Please try again later.');
      }
    };

    fetchGroups();
  }, [refreshGroups]);

  return (
    <StyledGroupDisplay>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <GroupContainer>
        {groups.map((group, index) => (
          <GroupItem key={group.group_id}>
            <GroupName>{group.group_name}</GroupName>
            <GroupDetails>
              <strong>Mentor:</strong> {group.mentor_name}<br />
              <strong>Mentees:</strong>
              <MenteesList>
                {group.mentees.map(mentee => (
                  <li key={mentee.id}>{mentee.name}</li>
                ))}
              </MenteesList>
            </GroupDetails>
          </GroupItem>
        ))}
      </GroupContainer>
    </StyledGroupDisplay>
  );
}

export default GroupDisplay;

const StyledGroupDisplay = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
`;

const GroupItem = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 20px;
  width: calc(50% - 20px);
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const GroupName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const GroupDetails = styled.div`
  font-size: 16px;
`;

const MenteesList = styled.ul`
  margin-top: 5px;
  margin-left: 20px;
  list-style: none;
  padding: 0;
  color: #666;
`;
