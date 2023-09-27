import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';
import Dashboard from './Dashboard';
import UserSettings from './UserSettings'; // Import UserSettings
import Navbar from './Navbar';
import { auth } from './firebase';

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
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <UserSettings /> : <Navigate to="/login" />} /> {/* Added UserSettings */}
      </Routes>
    </Router>
  );
}

export default App;
