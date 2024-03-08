import React, { useState } from 'react';

const WeatherApp = () => {
  const apiKey = "e5745ad5d0245ba0b5762bafd7bcbbd4";

  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const weatherDescriptions = {
    "clear sky": "céu limpo",
    "few clouds": "poucas nuvens",
    "scattered clouds": "nuvens dispersas",
    "broken clouds": "nuvens quebradas",
    "shower rain": "chuva rápida",
    "rain": "chuva",
    "thunderstorm": "tempestade",
    "snow": "neve",
    "mist": "névoa",
    "fog": "nevoeiro",
    "haze": "neblina",
    "smoke": "fumaça"
  };

  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('Não foi possível obter dados meteorológicos para esta localização.');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError('Não foi possível obter dados meteorológicos para esta localização.');
      setWeatherData(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await fetchWeatherData(location);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Digite uma localização..." value={location} onChange={(e) => setLocation(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-container">
          <h2>{weatherData.name}</h2>
          <p>{weatherDescriptions[weatherData.weather[0].description]}</p>
          <p>Temperatura: {weatherData.main.temp} °C</p>
          <p>Temperatura Máxima: {weatherData.main.temp_max} °C</p>
          <p>Temperatura Mínima: {weatherData.main.temp_min} °C</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Vento: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
