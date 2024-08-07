import React, { useEffect } from 'react';
import './SavedLocation.css';

const SavedLocations = ({ savedLocations, setSavedLocations }) => {
  useEffect(() => {
    // Load saved locations from local storage when the component mounts
    const saved = JSON.parse(localStorage.getItem('savedLocations'));
    if (saved) {
      setSavedLocations(saved);
    }
  }, [setSavedLocations]);

  return (
    <div className="saved-locations">
      <h2>Saved Locations</h2>
      {savedLocations && savedLocations.length > 0 ? (
        savedLocations.map((location, index) => (
          location && location.weather && location.weather.current ? (
            <div key={index} className="weather-card">
              <h3>{location.name}</h3>
              <p>Temperature: {location.weather.current.temp_c}°C</p>
              <p>Humidity: {location.weather.current.humidity}%</p>
              <p>Wind Speed: {location.weather.current.wind_kph} kph</p>
            </div>
          ) : null
        ))
      ) : (
        <p>No saved locations.</p>
      )}
    </div>
  );
};

export default SavedLocations;
