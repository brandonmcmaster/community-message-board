import React, { useState, useEffect } from 'react';
import { db } from './firebase';  // Adjust the import to match your file structure
import { collection, onSnapshot } from 'firebase/firestore';
import UserLink from './UserLink';  // Import UserLink
import { doc, deleteDoc } from 'firebase/firestore';

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

  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      alert("Post deleted successfully.");
    } catch (e) {
      alert("Error deleting post: ", e);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl mb-4">Post List</h1>
        
        {/* List of Posts */}
        <div className="post-list">
          {posts.map((post, index) => (
            <div key={index} className="flex items-start space-x-4 mb-4">
              <div className="flex-none">
                {post.userId ? <UserLink userId={post.userId} /> : "Unknown User"}
              </div>
              <div className="flex-grow bg-gray-800 p-4 rounded-lg">
                <h2 className="text-2xl">{post.title}</h2>
                <p className="text-xl">{post.content}</p>
                <button onClick={() => deletePost(post.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
  Delete
</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
