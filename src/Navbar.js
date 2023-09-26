import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold">
          Home
        </Link>
        <div className="flex items-center">
          <Link to="/login" className="mr-4 hover:underline">
            Login
          </Link>
          <Link to="/message-board" className="mr-4 hover:underline">
            Message Board
          </Link>
          
          {/* Dashboard Link */}
          <Link to="/dashboard" className="mr-4 hover:underline">
            Dashboard
          </Link>

          {/* Avatar - Placeholder image URL for now */}
          <Link to="/dashboard">
            <img src="https://via.placeholder.com/50" alt="User Avatar" className="h-8 w-8 rounded-full" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
