import React, { useEffect, useState } from 'react';
import { addSection, fetchCurrentUserRole } from '../firestoreUtils';
import { Link } from 'react-router-dom';

const SectionList = ({ sections, refreshSections }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);

  useEffect(() => {
    fetchCurrentUserRole().then((role) => {
      if (role === 'admin') {
        setIsAdmin(true);
      }
    });
  }, []);

  const handleAddSection = () => {
    addSection(newSectionTitle, newSectionDescription)
      .then(() => {
        setNewSectionTitle('');
        setNewSectionDescription('');
        refreshSections();
      });
  };

  return (
    <div className="mb-4">
      <ul>
        {sections.map((section, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
            <Link to={`/message-board/section/${section.id}`} className="text-2xl font-bold text-white">
              {section.name}
            </Link>
            <p className="text-base text-gray-400">{section.description}</p>
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div>
          <button 
            onClick={() => setShowAddSection(!showAddSection)}
            className="bg-red-600 p-2 rounded text-white"
          >
            Toggle Add Section
          </button>

          {showAddSection && (
            <div className="bg-gray-800 p-4 rounded mt-4">
              <input 
                type="text" 
                placeholder="New Section Title" 
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                className="block w-full p-2 mb-2 bg-gray-900 rounded text-white"
              />
              <input 
                type="text" 
                placeholder="New Section Description" 
                value={newSectionDescription}
                onChange={(e) => setNewSectionDescription(e.target.value)}
                className="block w-full p-2 mb-2 bg-gray-900 rounded text-white"
              />
              <button 
                onClick={handleAddSection}
                className="bg-red-600 p-2 rounded text-white"
              >
                Add New Section
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionList;
