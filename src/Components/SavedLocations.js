import React, { useState,useEffect } from 'react';
import './SavedLocation.css';


const SavedLocations = ({ savedLocations, setSavedLocations }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    // Load saved locations from local storage when the component mounts
    const saved = JSON.parse(localStorage.getItem('savedLocations'));
    if (saved) {
      setSavedLocations(saved);
    }
  }, [setSavedLocations]);

  const toFahrenheit = (celsius) => (celsius * 9/5) + 32;
  const formatTemperature = (temp) => {
    return isCelsius ? `${temp}°C` : `${toFahrenheit(temp).toFixed(1)}°F`;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="saved-locations">
      <h2>Saved Locations</h2>
      <button onClick={toggleTemperatureUnit}>
        Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </button>
      {savedLocations && savedLocations.length > 0 ? (
        savedLocations.map((location, index) => (
          location && location.weather && location.weather.current ? (
            <div key={index} className="weather-card">
              <h3>{location.name}</h3>
              <p>Temperature: {formatTemperature(location.weather.current.temp_c)}</p>
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