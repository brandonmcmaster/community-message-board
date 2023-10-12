import React from 'react';
import { Link } from 'react-router-dom';  // For navigation

const ThreadPreview = ({ thread }) => {
  return (
    <div className="bg-gray-800 p-2 rounded mb-2">
      <Link to={`/threads/${thread.id}`} className="text-white">
        <h3 className="text-xl">{thread.title}</h3>
      </Link>
      <p className="text-sm text-gray-400">Posted by {thread.createdBy}</p>
    </div>
  );
};

export default ThreadPreview;
