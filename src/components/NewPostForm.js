import React, { useState } from 'react';
import { addPostToThread } from '../firestoreUtils';  // Make sure to import this function
import { auth } from '../firebase';  // Import Firebase auth to get the user ID

const NewPostForm = ({ threadId, refreshPosts }) => {  // Accept threadId and refreshPosts as props
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    if (userId) {
      addPostToThread(threadId, content, userId)
        .then(() => {
          console.log("New post added, about to refresh posts");
          setContent('');
          refreshPosts();  // Refresh the list of posts after creating a new one
        });
    } else {
      console.error("User is not logged in, cannot post.");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h3 className="text-2xl mb-2">Add New Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea 
          placeholder="Your content here" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full p-2 mb-2 bg-gray-900 rounded text-white"
        />
        <button type="submit" className="bg-red-600 p-2 rounded text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
