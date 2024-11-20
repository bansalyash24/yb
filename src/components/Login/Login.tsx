// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const navigate = useNavigate();
  
    const validate = () => {
      const newErrors: { username?: string; password?: string } = {};
      if (!username) newErrors.username = 'Username is required';
      if (!password) newErrors.password = 'Password is required';
      return newErrors;
    };
  
    const handleLogin = async () => {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      setLoading(true);
      try {
        const response = await axios.post('https://fakestoreapi.com/auth/login', { username, password });
        localStorage.setItem('token', response.data.token);
        navigate('/products');
      } catch (error) {
        console.error('Login failed', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className='outer-container'>
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <div className="login-logo"></div>
            <h2>Login</h2>
            <p>Welcome to smart investment</p>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email ID or Username"
          />
          {errors.username && <div className="error">{errors.username}</div>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {errors.password && <div className="error">{errors.password}</div>}
          <button onClick={handleLogin} disabled={loading}>Log In</button>
          {loading && <Spinner />}
          <p className="signup-link">
            Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
          </p>
        </div>
      </div>
      </div>
    );
  };
  
  export default Login;