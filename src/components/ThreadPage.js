import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchThreadById } from '../firestoreUtils';  // Make sure to implement this function

const ThreadPage = () => {
  const { threadId } = useParams();
  const [threadDetails, setThreadDetails] = useState(null);

  useEffect(() => {
    fetchThreadById(threadId).then(details => {
      setThreadDetails(details);
    });
  }, [threadId]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl mb-4">{threadDetails ? threadDetails.title : 'Loading...'}</h1>
        <p>{threadDetails ? threadDetails.description : 'Loading description...'}</p>
        {/* Here you can also add a component to list all the posts in the thread */}
      </div>
    </div>
  );
};

export default ThreadPage;
