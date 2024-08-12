
import React from 'react';
 import './Settings.css';

const Settings = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="toggle-container">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="toggle-input"
          />
          <span className="toggle-switch"></span>
          Dark Mode
        </label>
      </div>
    </div>
  );
};

export default Settings;