// src/Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS file for styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} WeatherApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
