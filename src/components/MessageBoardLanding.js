import React, { useEffect, useState } from 'react';
import PostList from './PostList';  
import { fetchSections } from '../firestoreUtils';  
import SectionList from './SectionList';  // Import the new component

const MessageBoardLanding = () => {
  const [sections, setSections] = useState([]);

  const refreshSections = () => {
    fetchSections().then(newSections => setSections(newSections));
  };

  useEffect(() => {
    refreshSections();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl mb-4">Welcome to the Message Board</h1>
        <SectionList sections={sections} refreshSections={refreshSections} />  {/* Pass refreshSections as a prop */}
        
      </div>
    </div>
  );
};

export default MessageBoardLanding;
