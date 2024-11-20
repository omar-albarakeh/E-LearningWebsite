import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.css';

const Signup = () => {
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

  try {
    const response = await axios.post('http://localhost/e-learning/backend/signup.php', {
      username,
      password,
    });

    if (response.data.message === 'Signup successful') {
      setMessage('Signup successful! Redirecting to login...');
      setMessageType('success');

      setTimeout(() => navigate('/'), 2000);
    } else {
      setMessage(response.data.message || 'Error signing up.');
      setMessageType('error');
    }
  } catch (error) {
    setMessage('Error signing up. Please try again.');
    setMessageType('error');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="container">
      <h1>Signup</h1>
      {message && <p className={`message ${messageType}`}>{message}</p>}
      <input
        type="text"
        placeholder="Username"
        value={signupForm.username}
        onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={signupForm.password}
        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
      />
      <button onClick={handleSignup} disabled={isLoading}>
        {isLoading ? 'Signing up...' : 'Signup'}
      </button>
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
