import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login, clearError } from '../redux/slices/authSlice';

const LoginContainer = styled.div`
  max-width: 450px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2575fc;
    box-shadow: 0 0 0 2px rgba(37, 117, 252, 0.2);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(37, 117, 252, 0.3);
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #fdecea;
  border-radius: 4px;
  text-align: center;
`;

const SignupLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #555;
  
  a {
    color: #2575fc;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { email, password } = formData;
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clear errors on component mount
    dispatch(clearError());
    
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, dispatch]);
  
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  
  return (
    <LoginContainer>
      <Title>Sign In</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={handleChange} 
            required 
            placeholder="Enter your email"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={handleChange} 
            required 
            placeholder="Enter your password"
          />
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Form>
      <SignupLink>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </SignupLink>
    </LoginContainer>
  );
};

export default Login;
