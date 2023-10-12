import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchThreadsBySection } from '../firestoreUtils';  // Import the function to fetch threads
import ThreadPreview from './ThreadPreview';  // Import ThreadPreview component

const SectionDetail = () => {
  const { sectionId } = useParams();  // Get sectionId from URL
  const [threads, setThreads] = useState([]);

  // Function to fetch and set threads
  const refreshThreads = () => {
    fetchThreadsBySection(sectionId).then(newThreads => setThreads(newThreads));
  };

  useEffect(() => {
    refreshThreads();
  }, [sectionId]);  // Re-fetch when sectionId changes

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl mb-4">Threads in this Section</h1>
        
        {/* Thread Previews */}
        {threads.map((thread, index) => (
          <ThreadPreview key={index} thread={thread} />
        ))}
        
        {/* Maybe add a button to create a new thread here */}
      </div>
    </div>
  );
};

export default SectionDetail;
