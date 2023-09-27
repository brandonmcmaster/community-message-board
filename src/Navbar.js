import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from './firebase';  // import the auth object

const Navbar = ({ user }) => {
  const handleLogout = () => {
    auth.signOut();  // Sign out the user
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-semibold">
            Home
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/message-board" className="mr-4 hover:underline">
            Message Board
          </Link>
          {user ? (
            <>
              <button onClick={handleLogout} className="mr-4 hover:underline">
                Logout
              </button>
              <Link to="/dashboard" className="mr-4 hover:underline">
                Dashboard
              </Link>
              <img src={user.photoURL} alt="User Avatar" className="h-8 w-8 rounded-full" />
            </>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
