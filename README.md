# QuickChat - Real-time Chat Application

QuickChat is a real-time chat application built using React.js for the frontend and Node.js, Express.js with Socket.IO for the backend server, allowing users to engage in instant messaging.

## Features

- **Real-time Messaging**: Instantly send and receive messages
- **Multi-User Chat**: Multiple users can login and chat simultaneously
- **User Presence**: Join and leave notifications
- **Typing Indicators**: See when other users are typing
- **Responsive Design**: Works seamlessly across devices

## Project Structure

The project is structured into two main folders:

- **frontend**: Contains the React application for the user interface
- **server**: Contains the Node.js server implementing Socket.IO for real-time messaging

## Technologies Used

### Frontend
- React.js
- CSS3 (with advanced design and interactive elements)

### Backend
- Node.js
- Express.js
- Socket.IO

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/quickchat.git
   cd quickchat
   ```

2. Install server dependencies
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the server
   ```bash
   cd server
   npm start
   ```

2. Start the frontend application (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## How It Works

1. Users enter their display names to join the chat
2. Socket.IO establishes a real-time connection between clients and server
3. Messages are broadcasted to all connected users
4. User status (online, typing) is updated in real-time
