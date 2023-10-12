import React, { useEffect, useState } from 'react';
import { fetchSectionById, fetchThreadsBySection } from '../firestoreUtils';
import CreatePost from './CreatePost';
import ThreadPreview from './ThreadPreview';

const SectionPage = ({ sectionId }) => {
  const [section, setSection] = useState(null);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // Fetch section details by ID and set in state
    fetchSectionById(sectionId).then(details => setSection(details));

    // Fetch threads related to this section and set in state
    fetchThreadsBySection(sectionId).then(fetchedThreads => setThreads(fetchedThreads));
  }, [sectionId]);

  return (
    <div>
      {section && (
        <div>
          <h1>{section.name}</h1>
          <p>{section.description}</p>
        </div>
      )}
      
      <CreatePost sectionId={sectionId} />
      
      {threads.map(thread => (
        <ThreadPreview key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default SectionPage;
