import React from 'react';
import './Message.css';

const Message = ({ message, isOwnMessage, user }) => {
  // Format the timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle notification type messages
  if (message.type === 'notification') {
    return (
      <div className="notification-message">
        <span>{message.text}</span>
      </div>
    );
  }

  return (
    <div className={`message-wrapper ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      {!isOwnMessage && (
        <div className="message-avatar">
          {message.sender?.username.charAt(0).toUpperCase()}
        </div>
      )}
      
      <div className="message-content">
        {!isOwnMessage && (
          <div className="message-username">
            {message.sender?.username}
          </div>
        )}
        
        <div className="message-bubble">
          <p>{message.text}</p>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
