import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import { useNavigate } from 'react-router-dom';
import backArrow from '../images/back-arrow.png';
import './backArrow.css';
import { API_KEY } from '../config';

function Weather() {
  const [city, setCity] = useState('corvallis');
  const [weatherData, setWeatherData] = useState(null);
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [selectedCity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWeatherData() {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_KEY}`);
      setWeatherData(response.data);
    }
    fetchWeatherData();
  }, [city]);

const handleCityChange = async (event) => {
  const value = event.target.value;
  setCity(value);
  if (value.length > 2) {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`);
    const cities = response.data.filter((city, index, self) => self.findIndex(c => c.name === city.name) === index);
    setSuggestedCities(cities);
  } else {
    setSuggestedCities([]);
  }
  if (event.keyCode === 13 && suggestedCities.length > 0) {
    setCity(suggestedCities[0].name);
    setSuggestedCities([]);
  }
};


  window.onload = function() {
        alert("Welcome to The DEMO page. Here you will see a weekly forcast of the weather! Please navigate and hover over options to see the prompts associated to them. When finished simply press the back button or use the navigation button on the bottom of the page.");
      } 

  const handleBack = () => {
    navigate(-1);
  };

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`);
      setCity(response.data.city.name);
      setWeatherData(response.data);
    });
  }

  const renderForecast = () => {
    if (!weatherData) {
      return null;
    }

    const groupedForecast = {};
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    let nextDay = new Date(today);

    // Show an 8-day forecast starting from today
    for (let i = 0; i < 8; i++) {
      const dayOfWeek = daysOfWeek[nextDay.getDay()];
      if (!groupedForecast[dayOfWeek]) {
        const forecast = weatherData.list.find((f) => {
          const date = new Date(f.dt * 1000);
          return date.getDay() === nextDay.getDay();
        });
        if (forecast) {
          groupedForecast[dayOfWeek] = {
            icon: forecast.weather[0].icon,
            description: forecast.weather[0].description,
            temperature: Math.round(forecast.main.temp),
            feelsLike: Math.round(forecast.main.feels_like),
          };
        }
      }
      nextDay.setDate(nextDay.getDate() + 1);
    }

    return Object.keys(groupedForecast).map((dayOfWeek) => {
      const { icon, description, temperature, feelsLike } = groupedForecast[dayOfWeek];

      return (
        <div className="forecast-item" key={dayOfWeek}>
          <span onMouseEnter={() => alert('You can click on the days of the week to navigate to the Hourly Forecast for that day!')}>
          <h2>{dayOfWeek}</h2>
          </span>
          <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={description} />
          <ul style={{ fontWeight: 'bold', color: 'black' }}>{description}</ul>
          <ul style={{ fontWeight: 'bold', color: 'black' }}>Temperature: {temperature}°F</ul>
          <ul style={{ fontWeight: 'bold', color: 'black' }}>Feels like: {feelsLike}°F</ul>
        </div>
      );
    });
  };

 return (
  <div style={{ paddingTop: '50px', paddingBottom: '50px' }} className="page-container">
  <h1>Weather App</h1>
        <img
        src={backArrow}
        alt="back arrow"
        className="back-arrow"
        onClick={() => handleBack()}
      />
  <div className="weather">
    <div className="location-input">
        { suggestedCities.length > 0 &&
          <ul className="suggestions">
              { suggestedCities.map((city) =>
                  <div key={city.name} className={city === selectedCity ? 'selected' : ''} onClick={() => {
                  setCity(city.name);
                  setSuggestedCities([]);
                  }}>
                  {city.name}
                  </div>
              )}
          </ul>
       }
 <input
  type="text"
  placeholder="Enter city name to get the local weather i.e. Miami"
  value={city}
  onChange={handleCityChange}
  onMouseEnter={() => {
    alert('Here you can search for a city nearby or far away by typing it out. The search will auto-fill suggestions');
  }}
/>
<button
  onClick={handleGetCurrentLocation}
  onMouseEnter={() => {
    alert('You can simply select get current location to find the weather nearby');
  }}
>
  Get Current Location
</button>
    </div>
    <div className="forecast">{renderForecast()}</div>
<span onMouseEnter={() => alert('This will navigate to a page dedicated to showing the closest earthquakes and data associated with it')}>
  Click here if you also want to get earthquake data near you
</span>
    </div>
    </div>
);
}

export default Weather;
