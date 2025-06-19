import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    onLogin(username);
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">QuickChat</h1>
        <p className="login-subtitle">Connect with friends in real-time</p>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Display Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your display name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
              autoComplete="off"
            />
          </div>
          
          <button type="submit" className="login-button">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
