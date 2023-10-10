import React from 'react';
import PostList from './PostList';  // Adjust the import to match your file structure
import CreatePost from './CreatePost';

const MessageBoardLanding = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl mb-4">Welcome to the Message Board</h1>
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
};

export default MessageBoardLanding;
