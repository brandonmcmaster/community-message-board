import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="bg-black text-white p-4">
      <h1 className="text-3xl font-semibold mb-4">Settings</h1>

      {/* Update Username */}
      <div className="mb-4">
        <label className="block text-xl font-medium mb-2">Update Username</label>
        <input type="text" className="border p-2 rounded w-full bg-gray-800 text-white" />
      </div>

      {/* Change Password */}
      <div className="mb-4">
        <label className="block text-xl font-medium mb-2">Change Password</label>
        <input type="password" className="border p-2 rounded w-full bg-gray-800 text-white" />
      </div>

      {/* Delete Account Button */}
      <button className="bg-red-600 text-white p-2 rounded w-full mb-4">
        Delete Account
      </button>

      {/* Log Out Button */}
      <Link to="/login" className="bg-gray-600 text-white p-2 rounded w-full">
        Log Out
      </Link>
    </div>
  );
};

export default Settings;
