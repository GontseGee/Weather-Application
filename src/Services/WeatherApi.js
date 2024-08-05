import axios from 'axios';

const API_KEY = '2604eb2e3fd049e98c182930240508';
export const fetchWeather = async (location) => {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
    return response.data;
  };
  
  export const fetchHourlyForecast = async (location) => {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&hours=12`);
    return response.data.forecast.forecastday[0].hour;
  };
  
  export const fetchWeeklyForecast = async (location) => {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`);
    return response.data.forecast.forecastday;
  };
  
  export const fetchMonthlyForecast = async (location) => {
    // Note: WeatherAPI.com does not provide a direct endpoint for monthly forecasts.
    // This is a placeholder for any custom implementation if needed.
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=30`);
    return response.data.forecast.forecastday;
  };