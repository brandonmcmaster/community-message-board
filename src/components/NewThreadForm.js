import React, { useState } from 'react';
import { createNewThread } from '../firestoreUtils';  // Import the function

const NewThreadForm = ({ sectionId, refreshThreads }) => {  // Accept sectionId and refreshThreads as props
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new thread in Firestore
    createNewThread(title, description, sectionId)
      .then(() => {
        setTitle('');
        setDescription('');
        refreshThreads();  // Refresh the list of threads after creating a new one
      });
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h3 className="text-2xl mb-2">Create New Thread</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 mb-2 bg-gray-900 rounded text-white"
        />
        <textarea 
          placeholder="Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 mb-2 bg-gray-900 rounded text-white"
        />
        <button 
          type="submit"
          className="bg-red-600 p-2 rounded text-white"
        >
          Create Thread
        </button>
      </form>
    </div>
  );
};

export default NewThreadForm;
