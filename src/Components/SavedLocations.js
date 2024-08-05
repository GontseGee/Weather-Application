import React from 'react';
import './SavedLocation.css';

const SavedLocations = ({ savedLocations, setSavedLocations }) => {
  const handleRemove = (locationName) => {
    const updatedLocations = savedLocations.filter(loc => loc.name !== locationName);
    setSavedLocations(updatedLocations);
    localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
  };

  return (
    <div>
      <h2>Saved Locations</h2>
      <div className="saved-locations-container">
        {savedLocations.map((location, index) => (
          <div className="card" key={index}>
            <h3>{location.name}</h3>
            <p>Temperature: {location.weather.current.temp_c}°C</p>
            <p>Humidity: {location.weather.current.humidity}%</p>
            <p>Wind Speed: {location.weather.current.wind_kph} kph</p>
            <button onClick={() => handleRemove(location.name)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedLocations;
