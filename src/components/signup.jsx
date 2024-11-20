import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../styles/styles.css';
const signup = () => {
  const [signupForm, setSignupForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

const handleSignup = async () => {
  const { username, password } = signupForm;

  if (!username || !password) {
    setMessage('Please fill in both username and password.');
    setMessageType('error');
    return;
  }

  setIsLoading(true);
  setMessage('');
  return (
    <div>signup</div>
  )
}
}
export default signup