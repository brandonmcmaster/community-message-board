import React, { useEffect, useState } from 'react';
import { fetchThreads } from '../firestoreUtils';  // Import the function to fetch threads

const ThreadList = ({ sectionId }) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // Fetch threads based on the sectionId from Firestore and set them in state
    fetchThreads(sectionId, setThreads);
  }, [sectionId]);

  return (
    <div className="mb-4">
      <h2 className="text-3xl mb-2">Threads</h2>
      <ul>
        {threads.map((thread, index) => (
          <li key={index} className="text-xl mb-1">
            {thread.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
