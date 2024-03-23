import React from 'react';
import styled from 'styled-components';

// Define a styled container for centering
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

// Define a styled wrapper for the content
const ContentWrapper = styled.div`
  /* Add additional styles as needed */
`;

function Nonadminpage() {
  return (
    <CenteredContainer>
      <ContentWrapper>
        <h1>Non-admin Page</h1>
        <h2>If the user is not an admin, this page will show up.</h2>
        {/* Add your content here */}
      </ContentWrapper>
    </CenteredContainer>
  );
}

export default Nonadminpage;
