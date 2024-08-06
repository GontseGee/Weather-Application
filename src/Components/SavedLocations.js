import React from 'react';
import './SavedLocation.css';

const SavedLocations = ({ savedLocations, setSavedLocations }) => {
  return (
    <div>
      <h2>Saved Locations</h2>
      <div className="saved-locations-container">
        {savedLocations && savedLocations.length > 0 ? (
          savedLocations.map((location, index) => (
            <div key={index} className="weather-card">
              {location && location.current && (
                <>
                  <h3>{location.name}</h3>
                  <p>{location.current.temperature}°C</p>
                  <p>{location.current.humidity}% Humidity</p>
                  <p>{location.current.wind_speed} m/s Wind</p>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No saved locations.</p>
        )}
      </div>
    </div>
  );
};

export default SavedLocations;
