import { useState } from 'react'
import { getUserRole, onLogin } from '../api/auth'
import Layout from '../components/layout'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)
  const navigate=useNavigate();
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await onLogin(values)
      dispatch(authenticateUser())
      localStorage.setItem('isAuth', 'true')
      const data = await getUserRole(); 
      // Assuming this function fetches the user's role from the backend
      const userRole = data.data.role; // Set the user's role in state
      console.log(userRole);
      if(userRole == 'Admin'){
        navigate("/admin");
      }
      else{
        navigate("/home");
      }
    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }


  return (
    <Layout>
      <Container>
        <Card>
          <form onSubmit={(e) => onSubmit(e)} className='container'>
            <h1 style={{color: '#0B3C58'}}>Welcome Back!</h1> 
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

            <ErrorMessage>{error}</ErrorMessage>

            <SubmitButton type='submit'>Submit</SubmitButton>
          </form>
        </Card>
      </Container>
    </Layout>
  )
}

export default Login

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
  height: 420px;
`;

const InputGroup = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 20px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: rgb(232, 240, 254);

  &::placeholder {
    color: #85929E;
  }
`;

const ErrorMessage = styled.div`
  color: red;
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
  margin: 30px 0;

  &:hover {
    background-color: #17202A;
  }
`;
