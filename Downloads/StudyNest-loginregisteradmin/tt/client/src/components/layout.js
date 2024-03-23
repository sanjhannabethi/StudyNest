import Navbar from './navbar'
import styled from 'styled-components';

const Layout = ({ children }) => {
  return (
    <StyledDiv>
    <div>
      <Navbar />
      <div className='container'>{children}</div>
    </div>
    </StyledDiv>
  )
}

export default Layout

const StyledDiv = styled.div`
  height: 100vh;
  background-color: #dde2f6;
`;