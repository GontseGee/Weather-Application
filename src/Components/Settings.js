
import React, { useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'C');

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
  };

  return (
    <div>
      <h2>Settings</h2>
      
      <div>
        <h3>Theme</h3>
        <label>
          <input
            type="radio"
            value="light"
            checked={theme === 'light'}
            onChange={handleThemeChange}
          />
          Light
        </label>
        <label>
          <input
            type="radio"
            value="dark"
            checked={theme === 'dark'}
            onChange={handleThemeChange}
          />
          Dark
        </label>
      </div>

      <div>
        <h3>Temperature Unit</h3>
        <label>
          <input
            type="radio"
            value="C"
            checked={unit === 'C'}
            onChange={handleUnitChange}
          />
          Celsius
        </label>
        <label>
          <input
            type="radio"
            value="F"
            checked={unit === 'F'}
            onChange={handleUnitChange}
          />
          Fahrenheit
        </label>
      </div>
    </div>
  );
};

export default Settings;
