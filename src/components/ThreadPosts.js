import React, { useEffect, useState } from 'react';
import { fetchPostsForThread } from '../firestoreUtils';  // Make sure to import the function

const ThreadPosts = ({ threadId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts for the specific thread from Firestore and set them in state
    fetchPostsForThread(threadId, setPosts);
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
