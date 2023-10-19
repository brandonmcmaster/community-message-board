import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchThreadById} from '../firestoreUtils';
import NewPostForm from './NewPostForm';
import ThreadPosts from './ThreadPosts';

const ThreadPage = () => {
  const { threadId } = useParams();
  const [threadDetails, setThreadDetails] = useState(null);

  const refreshPosts = useCallback(() => {
    // This function will trigger fetching posts in the child component
  }, []);

  useEffect(() => {
    fetchThreadById(threadId).then(details => {
      setThreadDetails(details);
    });
    // You can add any other initialization or fetching logic here
  }, [threadId]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl mb-4">{threadDetails ? threadDetails.title : 'Loading...'}</h1>
        <p>{threadDetails ? threadDetails.description : 'Loading description...'}</p>
        <ThreadPosts threadId={threadId} />
        <NewPostForm threadId={threadId} refreshPosts={refreshPosts} />
      </div>
    </div>
  );
};

export default ThreadPage;
