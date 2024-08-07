
import React from 'react';


const Settings = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="toggle-container">
        <label>
          <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
          Dark Mode
        </label>
      </div>
    </div>
  );
};

export default Settings;