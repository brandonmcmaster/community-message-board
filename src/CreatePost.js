import React, { useState } from 'react';
import { getAuth } from 'firebase/auth'; // Import the getAuth function
import { db } from './firebase';  // Adjust the import to match your file structure
import { collection, addDoc } from 'firebase/firestore';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get current user ID from Firebase Authentication
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    // Only proceed if userId exists
    if (userId) {
      try {
        await addDoc(collection(db, 'posts'), {
          title: title,
          content: content,
          userId: userId  // Include userId here
        });
        setTitle('');
        setContent('');
        alert('Post created successfully');
      } catch (e) {
        alert('Error creating post: ', e);
      }
    } else {
      alert('Please log in to create a post');
    }
  };

  return (
    <div className="bg-black text-white p-4 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-semibold">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 bg-gray-800 rounded border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-lg font-semibold">Content</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows="4" className="p-2 bg-gray-800 rounded border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
