import React, { useEffect, useState } from 'react';
import { addSection, fetchCurrentUserRole } from '../firestoreUtils';
import { Link } from 'react-router-dom';

const SectionList = ({ sections, refreshSections }) => {  // Added refreshSections prop
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
        refreshSections();  // Call refreshSections after successfully adding a new section
      });
  };

  return (
    <div className="mb-4">
      <h2 className="text-3xl mb-2">Sections</h2>
      <ul>
        {sections.map((section, index) => (
          <li key={index} className="text-xl mb-1">
            <Link to={`/message-board/section/${section.id}`}> {/* Wrap the section name with Link */}
              {section.name}
            </Link>
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
