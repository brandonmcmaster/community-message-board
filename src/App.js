import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import UserSettings from "./components/UserSettings"; // Import UserSettings
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import Footer from "./components/Footer";
import "./components/App.css";
import Header from "./components/Header";
import MessageBoardLanding from "./components/MessageBoardLanding"; // Adjust the path as needed

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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <Header />
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={user ? <UserSettings /> : <Navigate to="/login" />}
            />
            <Route path="/message-board" element={<MessageBoardLanding />} />{" "}
            {/* Add this route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
