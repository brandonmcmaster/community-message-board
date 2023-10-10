import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';
import Dashboard from './Dashboard';
import UserSettings from './UserSettings'; // Import UserSettings
import Navbar from './Navbar';
import { auth } from './firebase';
import Footer from './Footer';
import './App.css'; 
import Header from './Header';
import MessageBoardLanding from './MessageBoardLanding'; // Adjust the path as needed


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <Header />
        <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      <div className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <UserSettings /> : <Navigate to="/login" />} />
        <Route path="/message-board" element={<MessageBoardLanding />} /> {/* Add this route */}
      </Routes>
      </div>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
