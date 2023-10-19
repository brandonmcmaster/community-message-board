import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate
import { createNewThread } from '../firestoreUtils';  
import { auth } from '../firebase'; 

const NewThreadForm = () => {  // Note: We removed refreshThreads from props
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { sectionId } = useParams(); 
  const userId = auth.currentUser ? auth.currentUser.uid : null; 
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userId && sectionId) {
      // Create a new thread in Firestore
      await createNewThread(title, description, sectionId, userId);
      // Navigate back to the section page
      navigate(`/message-board/section/${sectionId}`);
    } else {
      // Handle the case where the user is not logged in or sectionId is missing
      console.error("User is not logged in, cannot create thread.");
    }
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

