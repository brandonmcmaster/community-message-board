import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const ThreadList = ({ threads, sectionId }) => {  // sectionId is added as a prop for constructing URLs
  return (
    <div className="mb-4">
      <h2 className="text-3xl mb-2">Threads</h2>
      <ul>
        {threads.map((thread) => (  // Use thread.id as the key
          <li key={thread.id} className="text-xl mb-1">
            <Link to={`/message-board/section/${sectionId}/thread/${thread.id}`} className="text-blue-500 hover:underline">
              {thread.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
