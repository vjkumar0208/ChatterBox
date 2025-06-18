# ChatterBox - Real-Time Chat Application

A modern real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO.

#Demo Link-https://chatterbox-kwez.onrender.com

## Features

- 🔐 User authentication (signup/login)
- 💬 Real-time messaging
- 🌅 Image sharing support
- 🟢 Online/Offline user status
- 🔍 User search functionality
- 🌓 more than 30 theme support using daisyUI
- 📱 Responsive design for all devices

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS with DaisyUI
- Socket.IO Client
- Zustand for state management
- React Router for navigation

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Cloudinary for image storage

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- MongoDB
- Git

## Environment Variables

### Backend (.env)

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5001
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development


### Frontend (.env)

VITE_API_BASE_URL=http://localhost:5001


## Installation

1. Clone the repository
bash
git clone <repository-url>
cd chat-app


2. Install backend dependencies
bash
cd backend
npm install


3. Install frontend dependencies
bash
cd frontend
npm install


## Running the Application

1. Start the backend server
bash
cd backend
npm run dev


2. Start the frontend development server
bash
cd frontend
npm run dev


The application should now be running at http://localhost:5173




