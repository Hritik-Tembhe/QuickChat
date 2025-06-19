import React, { useState, useRef, useEffect } from 'react';
import './ChatRoom.css';
import Message from './Message';
import UserList from './UserList';

const ChatRoom = ({ 
  user, 
  users, 
  messages, 
  isTyping, 
  onSendMessage, 
  onTyping,
  onStopTyping 
}) => {
  const [messageInput, setMessageInput] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
      
      // Clear typing timeout and notify stop typing
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      onStopTyping();
    }
  };
  
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    
    // Handle typing status
    if (!typingTimeoutRef.current) {
      onTyping();
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      onStopTyping();
      typingTimeoutRef.current = null;
    }, 2000);
  };
  
  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };
  
  const formatDate = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date().toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <h2 className="chat-title">QuickChat</h2>
        <div className="user-count" onClick={toggleUserList}>
          <span>{users.length} online</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
          </svg>
        </div>
      </div>
      
      {/* User List Sidebar (conditionally shown) */}
      {showUserList && (
        <UserList 
          users={users} 
          currentUser={user} 
          onClose={() => setShowUserList(false)} 
        />
      )}
      
      {/* Messages Area */}
      <div className="messages-container">
        <div className="date-divider">
          <span>{formatDate()}</span>
        </div>
        
        {messages.map((msg, index) => (
          <Message 
            key={index}
            message={msg}
            isOwnMessage={msg.sender?.id === user.id}
            user={user}
          />
        ))}
        
        {isTyping.status && (
          <div className="typing-indicator">
            <span>{isTyping.username} is typing</span>
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input Form */}
      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={handleInputChange}
          className="message-input"
          autoComplete="off"
        />
        <button type="submit" className="send-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
