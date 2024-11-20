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

  return (
    <div>login</div>
  )
}
}

export default login