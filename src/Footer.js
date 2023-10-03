import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2023 Community Message Board</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.google.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.google.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.google.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
