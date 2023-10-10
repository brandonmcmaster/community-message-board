import React, { useState } from 'react';
import { db } from './firebase';  // Adjust the import to match your file structure
import { collection, addDoc } from 'firebase/firestore';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        title: title,
        content: content,
      });
      setTitle('');
      setContent('');
      alert('Post created successfully');
    } catch (e) {
      alert('Error creating post: ', e);
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
