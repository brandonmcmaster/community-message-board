import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';  // make sure to import your db
import { fetchUserById } from '../firestoreUtils'; // Import the fetchUserById function
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth to get the current user ID


const ThreadPosts = ({ threadId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('threadId', '==', threadId));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const postsArray = [];
      await Promise.all(querySnapshot.docs.map(async (doc) => {
        const postData = {
          id: doc.id,
          ...doc.data(),
        };
        const userInfo = await fetchUserById(postData.postedBy);
        postData.photoURL = userInfo.photoURL;
        postsArray.push(postData);
      }));
      setPosts(postsArray);
    });

    return () => {
      unsubscribe();
    };
  }, [threadId]);

  return (
    <div className="mb-4">
      <h2 className="text-3xl mb-2">Replies</h2>
      <ul>
      {posts.map((post, index) => (
  <li key={index} className="text-xl mb-4 border-b-2 border-gray-300 pb-2">
    <Link to={auth.currentUser.uid === post.postedBy ? "/dashboard" : `/profile/${post.postedBy}`}>
      <img src={post.photoURL || 'avatar_url_here'} alt="User Avatar" className="w-10 h-10 rounded-full inline" />
    </Link>
    <span className="ml-4">{post.content}</span>
    <div className="text-sm text-gray-500">
      Posted on: {new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()}
    </div>
  </li>
))}

      </ul>
    </div>
  );
};

export default ThreadPosts;
