import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import LoginForm from './components/LoginForm';
import ChatRoom from './components/ChatRoom';

const SERVER_URL = 'http://localhost:5000';

function App() {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState({ status: false, username: '' });
  
  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);
    
    // Clean up socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (!socket) return;
    
    // Socket event listeners
    const handleUserJoined = (data) => {
      setUsers(data.users);
      setMessages(prevMessages => [
        ...prevMessages, 
        { type: 'notification', text: data.message, timestamp: new Date().toISOString() }
      ]);
    };
    
    const handleReceiveMessage = (data) => {
      setMessages(prevMessages => [...prevMessages, { 
        type: 'message',
        text: data.message,
        sender: data.user,
        timestamp: data.timestamp
      }]);
    };
    
    const handleUserTyping = (data) => {
      setIsTyping({ status: true, username: data.username });
    };
    
    const handleUserStopTyping = () => {
      setIsTyping({ status: false, username: '' });
    };
    
    const handleUserLeft = (data) => {
      setUsers(data.users);
      setMessages(prevMessages => [
        ...prevMessages, 
        { type: 'notification', text: data.message, timestamp: new Date().toISOString() }
      ]);
    };
    
    // Register event listeners
    socket.on('user_joined', handleUserJoined);
    socket.on('receive_message', handleReceiveMessage);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_stop_typing', handleUserStopTyping);
    socket.on('user_left', handleUserLeft);
    
    // Clean up event listeners on unmount
    return () => {
      socket.off('user_joined', handleUserJoined);
      socket.off('receive_message', handleReceiveMessage);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_stop_typing', handleUserStopTyping);
      socket.off('user_left', handleUserLeft);
    };
  }, [socket]);
  
  const handleLogin = (username) => {
    if (socket && username.trim()) {
      socket.emit('user_join', { username });
      setUser({ username, id: socket.id });
    }
  };
  
  const handleSendMessage = (message) => {
    if (socket && user && message.trim()) {
      socket.emit('send_message', { message });
    }
  };
  
  const handleTyping = () => {
    if (socket && user) {
      socket.emit('typing');
    }
  };
  
  const handleStopTyping = () => {
    if (socket && user) {
      socket.emit('stop_typing');
    }
  };
  
  return (
    <div className="app">
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <ChatRoom
          user={user}
          users={users}
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
          onStopTyping={handleStopTyping}
        />
      )}
    </div>
  );
}

export default App;
