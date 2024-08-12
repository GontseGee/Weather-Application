import React, { useState, useEffect } from 'react';
import { fetchWeather, fetchHourlyForecast, fetchWeeklyForecast, fetchMonthlyForecast } from '../Services/WeatherApi';
import './Home.css';

const weatherEmojis = {
  sunny: '☀️',
  rain: '🌧️',
  fog: '🌫️',
  wind: '💨',
  humidity: '💧',
};

const Home = ({ savedLocations, setSavedLocations }) => {
  // All other code should follow after imports
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('current');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedLocations'));
    if (saved) {
      console.log('Loaded saved locations:', saved);
      setSavedLocations(saved);
    }
  }, [setSavedLocations]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeather(searchTerm);
      setWeather(weatherData);
      const forecastData = await fetchHourlyForecast(searchTerm); 
      setForecast(forecastData);
    } catch (error) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    console.log('Weather data:', weather);
    console.log('Search term:', searchTerm);
    console.log('Saved locations:', savedLocations);
  
    if (
      weather &&
      searchTerm &&
      typeof searchTerm === 'string' &&
      typeof weather.current?.temp_c === 'number'
    ) {
      const locationExists = savedLocations.some((loc) => {
        console.log('Checking location:', loc);
        return typeof loc.name === 'string' && loc.name.toLowerCase() === searchTerm.toLowerCase();
      });
  
      if (!locationExists) {
        const newSavedLocations = [
          ...savedLocations,
          {
            name: searchTerm,
            weather: {
              current: {
                temp_c: weather.current.temp_c,
                humidity: weather.current.humidity,
                wind_kph: weather.current.wind_kph,
              },
            },
          },
        ];
  
        setSavedLocations(newSavedLocations);
        localStorage.setItem('savedLocations', JSON.stringify(newSavedLocations));
        setNotification(`Location ${searchTerm} saved to Saved Locations.`);
        setTimeout(() => {
          setNotification('');
        }, 3000);
      } else {
        setError('Location is already saved or weather data is missing.');
      }
    } else {
      setError('Location is already saved or weather data is missing.');
    }
  };
  
  const handleDelete = (name) => {
    const newSavedLocations = savedLocations.filter((location) => location.name !== name);
    setSavedLocations(newSavedLocations);
    localStorage.setItem('savedLocations', JSON.stringify(newSavedLocations));
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
              <div className="forecast-card" key={index}>
                <h4>{new Date(hour.time).toLocaleTimeString()}</h4>
                <p>{hour.temp_c}°C</p>
                <p>{getWeatherEmoji('Sunny')}</p>
              </div>
            ))}
            {view === 'weekly' && forecast.map((day, index) => (
              <div className="forecast-card" key={index}>
                <h4>{new Date(day.date).toLocaleDateString()}</h4>
                <p>{day.day && day.day.avgtemp_c}°C</p>
                <p>{getWeatherEmoji('Sunny')}</p>
              </div>
            ))}
            {view === 'monthly' && forecast.map((day, index) => (
              <div className="forecast-card" key={index}>
                <h4>{new Date(day.date).toLocaleDateString()}</h4>
                <p>{day.day && day.day.avgtemp_c}°C</p>
                <p>{getWeatherEmoji('Sunny')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="saved-locations">
        <h2>Saved Locations</h2>
        {savedLocations && savedLocations.length > 0 ? (
          savedLocations.map((location, index) => (
            location.weather && location.weather.current ? (
              <div key={index} className="weather-card">
                <h3>{location.name}</h3>
                <p>{getWeatherEmoji('Sunny')} Temperature: {location.weather.current.temp_c}°C</p>
                <p>{getWeatherEmoji('Humidity')} Humidity: {location.weather.current.humidity}%</p>
                <p>{getWeatherEmoji('Wind')} Wind Speed: {location.weather.current.wind_kph} kph</p>
                <button onClick={() => handleDelete(location.name)}>Delete</button>
              </div>
            ) : null
          ))
        ) : (
          <p>No saved locations.</p>
        )}
      </div>
    </div>
  );
};

export default Home;