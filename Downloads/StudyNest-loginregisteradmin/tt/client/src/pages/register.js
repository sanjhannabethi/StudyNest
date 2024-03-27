import { useState, useEffect } from 'react';
import { onRegistration } from '../api/auth';
import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout';
import styled from 'styled-components';


const userTypes = ['Mentee', 'Mentor', 'Admin']; // Array of user types

const Register = () => {
  const navigate=useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    cnfpassword: '',
    userType: userTypes[0], // Default user type
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [usersData, setUsersData] = useState([]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // console.log(values);
  useEffect(() => {
    // Retrieve userData from localStorage when the component mounts
    const userDataFromStorage = JSON.parse(localStorage.getItem('userData'));
    if (userDataFromStorage) {
      setUsersData(userDataFromStorage);
    }
  }, []); 
  
  // Run this effect only once when the component mounts
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!values.username || !values.email || !values.password || !values.cnfpassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (values.password !== values.cnfpassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const { data } = await onRegistration(values);
      setError('');
      setSuccess(data.message);

      // Update usersData with the new value and store in localStorage
      const updatedUsersData = [...usersData, values];
      setUsersData(updatedUsersData);
      localStorage.setItem('userData', JSON.stringify(updatedUsersData));

      // Clear form fields
      setValues({ username: '', email: '', password: '', cnfpassword: '', userType: userTypes[0] });

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.errors?.[0]?.msg);
      setSuccess('');
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#0B3C58';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);


  return (
    <Layout>
      <Container>
        <Card>
          <form onSubmit={(e) => onSubmit(e)} className='container'>
            <h1 style={{ color: '#0B3C58' }}>Register</h1>

            <InputGroup>
              <label htmlFor='username'>Username</label>
              <StyledInput
                onChange={(e) => onChange(e)}
                type='text'
                id='username'
                name='username'
                value={values.username}
                placeholder='Enter username'
                required
              />
            </InputGroup>

            <InputGroup>
              <label htmlFor='email'>Email address</label>
              <StyledInput
                onChange={(e) => onChange(e)}
                type='email'
                id='email'
                name='email'
                value={values.email}
                placeholder='user@gmail.com'
                required
              />
            </InputGroup>

            <InputGroup>
              <label htmlFor='userType'>User Type</label>
              <StyledSelect
                id='userType'
                name='userType'
                value={values.userType}
                onChange={(e) => onChange(e)}
              >
                {userTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </StyledSelect>
            </InputGroup>

            <InputGroup>
              <label htmlFor='password'>Password</label>
              <StyledInput
                onChange={(e) => onChange(e)}
                type='password'
                value={values.password}
                id='password'
                name='password'
                placeholder='password'
                required
              />
            </InputGroup>

            <InputGroup>
              <label htmlFor='cnfpassword'>Confirm Password</label>
              <StyledInput
                onChange={(e) => onChange(e)}
                type='password'
                value={values.cnfpassword}
                id='cnfpassword'
                name='cnfpassword'
                placeholder='Confirm password'
                required
              />
            </InputGroup>

            <ErrorMessage>{error}</ErrorMessage>
            <SuccessMessage>{success}</SuccessMessage>

            <SubmitButton type='submit'>Submit</SubmitButton>
          </form>
        </Card>
      </Container>
    </Layout>
  );
};

export default Register;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 93vh;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0.2, 0, 0.2);
  padding: 20px;
  width: 400px;
  height: auto;
`;

const InputGroup = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 18px; 
    color: #0B3C58; 
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #0B3C58;
  background-color: rgb(232, 240, 254);

  &::placeholder {
    color: #85929E;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: rgb(232, 240, 254);
  color: #0B3C58;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;

const SuccessMessage = styled.div`
  color: green;
  margin: 10px 0;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 20px;
  background-color: #283747;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px; 

  &:hover {
    background-color: #17202A;
  }
`;
