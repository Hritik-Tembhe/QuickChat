import React from 'react';
import './UserList.css';

const UserList = ({ users, currentUser, onClose }) => {
  return (
    <div className="user-list-overlay">
      <div className="user-list-container">
        <div className="user-list-header">
          <h3>Online Users</h3>
          <button className="close-button" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        
        <div className="user-list">
          {users.map((user) => (
            <div 
              key={user.id} 
              className={`user-item ${user.id === currentUser.id ? 'current-user' : ''}`}
            >
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">{user.username}</span>
                {user.id === currentUser.id && (
                  <span className="user-you-badge">You</span>
                )}
              </div>
              <span className="user-status"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
