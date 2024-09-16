// src/pages/Login.jsx
import React, { useState } from 'react';
import Footer from '../components/Footer';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';
import { setUsername as setStoredUsername } from '../utils/LocalStorageUtils';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      if (response.message === 'Login successful') {
        setStoredUsername(username);
        onLogin(username);
        navigate('/');
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="container-sm my-5">
      <div className="col-12 col-5">
        <div className="header row">
          <div className="col-12">
            <h1>21-day</h1>
            <h1>Date Challenge</h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 col-md-7 mb-3">
            <h3>Login</h3>
            <div className="input-group my-3">
              <span className="input-group-text" id="account">Account</span>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="password">Password</span>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <div className="d-grid">
              <button onClick={handleLogin} className="btn btn-outline-secondary">
                Login
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;