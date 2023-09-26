import React from 'react';

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 p-4">
        <h1 className="text-3xl font-semibold">Columbus Underground Music Community</h1>
      </div>

      {/* Main Content Area */}
      <main className="p-4">
        <h2 className="text-2xl font-medium">Recent Posts</h2>
        {/* Placeholder for posts */}
        <div className="bg-gray-800 p-4 rounded mt-4">
          This is where posts will go.
        </div>
      </main>

      {/* Sidebar */}
      <aside className="bg-gray-800 p-4">
        <h3 className="text-xl font-medium">Upcoming Shows</h3>
        {/* Placeholder for calendar */}
        <div className="bg-gray-700 p-4 rounded mt-4">
          This is where the calendar will go.
        </div>
      </aside>

      {/* Footer */}
      <footer className="bg-gray-900 p-4">
        <p>© 2023 Columbus Underground Music Community. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
