import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchThreadsBySection, fetchSectionById } from '../firestoreUtils';  // Import the new functions
import ThreadList from './ThreadList';

const SectionPage = () => {
  const { sectionId } = useParams();  // Retrieve sectionId from route parameters
  const [sectionDetails, setSectionDetails] = useState(null);
  const [threads, setThreads] = useState([]);  // Initialize threads state

  const refreshThreads = () => {
    fetchThreadsBySection(sectionId).then(newThreads => setThreads(newThreads));
  };

  useEffect(() => {
    fetchSectionById(sectionId).then(details => {
      console.log('Section Details:', details);
      setSectionDetails(details);
    });
    refreshThreads();  // Refresh the threads when the component mounts
  }, [sectionId, refreshThreads]);

  console.log('Threads:', threads);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl mb-4">Section: {sectionDetails ? sectionDetails.name : 'Loading...'}</h1>
        <p>{sectionDetails ? sectionDetails.description : 'Loading description...'}</p>

        {/* Render ThreadList here */}
        <ThreadList threads={threads} refreshThreads={refreshThreads} />
      </div>
    </div>
  );
};

export default SectionPage;
