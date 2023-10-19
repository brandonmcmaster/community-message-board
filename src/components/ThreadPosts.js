import React, { useEffect, useState } from 'react';
import { listenToPostsForThread } from '../firestoreUtils';  // Make sure to import the function

const ThreadPosts = ({ threadId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Listen to real-time updates
    const unsubscribe = listenToPostsForThread(threadId, setPosts);
    
    // Unsubscribe from real-time updates when the component unmounts
    return () => unsubscribe();
  }, [threadId]);

  return (
    <div className="mb-4">
      <h2 className="text-3xl mb-2">Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index} className="text-xl mb-1">
            {post.content} 
            {/* You can add more information here like the author, time, etc. */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadPosts;
