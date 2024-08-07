import React, { useState, useEffect } from 'react';
import { fetchWeather,fetchHourlyForecast, fetchWeeklyForecast, fetchMonthlyForecast } from '../Services/WeatherApi';

import './Home.css';

const weatherEmojis = {
  sunny: '☀️',
  rain: '🌧️',
  fog: '🌫️',
  wind: '💨',
  humidity: '💧',
};

const Home = ({ savedLocations, setSavedLocations }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('current'); // current, hourly, weekly, monthly
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedLocations'));
    if (saved) {
      setSavedLocations(saved);
    }
  }, [setSavedLocations]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeather(searchTerm);
      setWeather(weatherData);
      const forecastData = await fetchHourlyForecast(searchTerm); // Default to hourly forecast
      setForecast(forecastData);
    } catch (error) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!weather || !searchTerm) {
      console.log(searchTerm)
      setError('Weather data or search term is missing.');
      return;
    }

 
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();


    const isAlreadySaved = savedLocations.some((loc) => loc.name.toLowerCase() === normalizedSearchTerm);

    if (isAlreadySaved) {
      setError('Location is already saved.');
      return;
    }

    
    const newSavedLocations = [
      ...savedLocations,
      {
        name: searchTerm,
        current: {
          temperature: weather.current.temp_c,
          humidity: weather.current.humidity,
          wind_speed: weather.current.wind_kph,
        },
      },
    ];

    setSavedLocations(newSavedLocations);
    localStorage.setItem('savedLocations', JSON.stringify(newSavedLocations));
    setNotification(`Location ${searchTerm} saved to Saved Locations.`);
    setTimeout(() => {
      setNotification('');
    }, 3000); // Clear notification after 3 seconds
  };

  const handleViewChange = async (viewType) => {
    setLoading(true);
    setError(null);
    try {
      let forecastData;
      switch (viewType) {
        case 'hourly':
          forecastData = await fetchHourlyForecast(searchTerm);
          break;
        case 'weekly':
          forecastData = await fetchWeeklyForecast(searchTerm);
          break;
        case 'monthly':
          forecastData = await fetchMonthlyForecast(searchTerm);
          break;
        default:
          forecastData = await fetchHourlyForecast(searchTerm);
      }
      setForecast(forecastData);
      setView(viewType);
    } catch (error) {
      setError('Failed to fetch forecast data.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherEmoji = (condition) => {
    switch (condition) {
      case 'Sunny':
        return weatherEmojis.sunny;
      case 'Rain':
        return weatherEmojis.rain;
      case 'Fog':
        return weatherEmojis.fog;
      case 'Wind':
        return weatherEmojis.wind;
      case 'Humidity':
        return weatherEmojis.humidity;
      default:
        return '';
    }
  };

  return (
    <div>
      <h1>Weather Information</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter location"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button onClick={handleSave} disabled={!weather || !searchTerm}>
          Save
        </button>
      </div>
      {notification && <div className="notification">{notification}</div>}
      <div className="view-buttons">
        <button onClick={() => handleViewChange('current')}>Current</button>
        <button onClick={() => handleViewChange('hourly')}>Hourly</button>
        <button onClick={() => handleViewChange('weekly')}>Weekly</button>
        <button onClick={() => handleViewChange('monthly')}>Monthly</button>
      </div>
      {error && <p>{error}</p>}
      {weather && view === 'current' && weather.current && (
        <div className="card">
          <h2>Current Weather</h2>
          <p>{getWeatherEmoji('Sunny')} Temperature: {weather.current.temp_c}°C</p>
          <p>{getWeatherEmoji('Humidity')} Humidity: {weather.current.humidity}%</p>
          <p>{getWeatherEmoji('Wind')} Wind Speed: {weather.current.wind_kph} kph</p>
        </div>
      )}
      {forecast && view !== 'current' && (
        <div>
          <h2>{view.charAt(0).toUpperCase() + view.slice(1)} Forecast</h2>
          <div className="forecast-container">
            {view === 'hourly' && forecast.map((hour, index) => (
              <div className="card" key={index}>
                <p>{new Date(hour.time).toLocaleTimeString()}: {hour.temp_c}°C {getWeatherEmoji('Sunny')}</p>
              </div>
            ))}
            {view === 'weekly' && forecast.map((day, index) => (
              <div className="card" key={index}>
                <p>{new Date(day.date).toLocaleDateString()}: {day.day && day.day.avgtemp_c}°C {getWeatherEmoji('Sunny')}</p>
              </div>
            ))}
            {view === 'monthly' && forecast.map((day, index) => (
              <div className="card" key={index}>
                <p>{new Date(day.date).toLocaleDateString()}: {day.day && day.day.avgtemp_c}°C {getWeatherEmoji('Sunny')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;