import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold">
          Home
        </Link>
        <div>
          <Link to="/login" className="mr-4 hover:underline">
            Login
          </Link>
          <Link to="/message-board" className="hover:underline">
            Message Board
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
