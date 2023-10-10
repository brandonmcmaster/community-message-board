import React, { useState, useEffect } from 'react';
import { db } from './firebase';  // Adjust the import to match your file structure
import { collection, onSnapshot } from 'firebase/firestore';
import UserLink from './UserLink';  // Import UserLink

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postData = [];
      snapshot.forEach(doc => postData.push({ ...doc.data(), id: doc.id }));
      setPosts(postData);
    });
    return () => unsubscribe();  // Cleanup subscription on unmount
  }, []);
  
  console.log("Post userId:", posts.userId);
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl mb-4">Post List</h1>
        
        {/* List of Posts */}
        <div className="post-list">
          {posts.map((post, index) => (
            <div key={index} className="post bg-gray-800 p-4 rounded-lg mb-4">
             {post.userId ? <UserLink userId={post.userId} /> : "Unknown User"}
              <h2 className="text-2xl">{post.title}</h2>
              <p className="text-xl">{post.content}</p>
              <a href="#" className="text-blue-400 hover:text-blue-600">Read More</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
