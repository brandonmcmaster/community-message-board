import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';
import Navbar from './Navbar';
import Dashboard from './Dashboard';  
import UserSettings from './UserSettings';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/user-settings" element={<UserSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
