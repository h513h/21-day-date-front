import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { useAppContext } from '../AppContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUsername: setContextUsername } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Sending login request...');
      const response = await login(username, password);
      console.log('Received response:', response);
      // Since the response contains { message: "Login successful", user_id: 2 }
      if (response.message === 'Login successful') {
        console.log('Login successful, setting username...');
        setContextUsername(username);
        localStorage.setItem('username', username);
        console.log('Username set, navigating to home...');
        navigate('/');
      } else {
        console.log('Login failed:', response.error);
        setError('Failed to log in. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Account</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-grid">
              <button type="submit" className="btn btn-secondary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;