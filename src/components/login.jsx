import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const login = () => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
  const { username, password } = loginForm;

  if (!username || !password) {
    setMessage('Please fill in both username and password.');
    setMessageType('error');
    return;
  }
  setIsLoading(true);
  setMessage('');
   try {
    const response = await axios.post('http://localhost/e-learning/backend/login.php', {
      username,
      password,
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful!');
      setMessageType('success');
      navigate('/student');
    } else {
      setMessage(response.data.message || 'Invalid username or password.');
      setMessageType('error');
    }
  } catch (error) {
    setMessage('Error logging in. Please try again.');
    setMessageType('error');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div>login</div>
  )
}
}

export default login