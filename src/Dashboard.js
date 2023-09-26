import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="bg-black text-white p-4">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

      {/* User Information */}
      <div className="flex items-center mb-4">
        <img src="https://via.placeholder.com/50" alt="User Avatar" className="h-16 w-16 rounded-full mr-4"/>
        <div>
          <h2 className="text-xl font-medium">Username</h2>
          <p>Email</p>
        </div>
      </div>

      {/* User Posts */}
      <div className="mb-4">
        <h2 className="text-2xl font-medium mb-2">Your Posts</h2>
        {/* Placeholder for posts */}
        <div className="bg-gray-700 p-4 rounded">
          Placeholder for posts
        </div>
      </div>

      {/* User Settings Button */}
      <Link to="/user-settings" className="bg-red-600 text-white p-2 rounded">
        Go to Settings
      </Link>
    </div>
  );
};

export default Dashboard;
