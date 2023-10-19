import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchThreadsBySection, fetchSectionById } from '../firestoreUtils';
import ThreadList from './ThreadList';

const SectionPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();  // Add this line to use the navigate function
  const [sectionDetails, setSectionDetails] = useState(null);
  const [threads, setThreads] = useState([]);

  const refreshThreads = useCallback(() => {
    if (sectionId) {
      fetchThreadsBySection(sectionId).then(newThreads => setThreads(newThreads));
    }
  }, [sectionId]);

  useEffect(() => {
    if (sectionId) {
      fetchSectionById(sectionId).then(details => {
        setSectionDetails(details);
      });
      refreshThreads();
    }
  }, [sectionId, refreshThreads]);

  // Function to navigate to the NewThreadForm page
  const goToNewThreadForm = () => {
    navigate(`/message-board/section/${sectionId}/new-thread`);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <button onClick={goToNewThreadForm} className="bg-red-600 p-2 rounded text-white mb-4">
          Create New Thread
        </button>
        <h1 className="text-4xl mb-4">{sectionDetails ? sectionDetails.name : 'Loading...'}</h1>
        <p>{sectionDetails ? sectionDetails.description : 'Loading description...'}</p>
        <ThreadList threads={threads} refreshThreads={refreshThreads} />
      </div>
    </div>
  );
};

export default SectionPage;
