import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.css';

const Login = () => {
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
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      setMessage('Login successful!');
      setMessageType('success');

      if (role === 'student') {
        navigate('/student');
      } else if (role === 'instructor') {
        navigate('/instructor');
      } else if (role === 'admin') {
        navigate('/admin');
      } else {
        setMessage('Role not recognized.');
        setMessageType('error');
      }
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
    <div className="container">
      <h1>Login</h1>
      {message && <p className={`message ${messageType}`}>{message}</p>}
      <input
        type="text"
        placeholder="Username"
        value={loginForm.username}
        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={loginForm.password}
        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
