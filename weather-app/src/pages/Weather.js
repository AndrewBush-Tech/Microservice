import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import { Link } from 'react-router-dom';

const API_KEY = '03052161780fccba0bb23fa696939052';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [selectedCity] = useState(null);

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
  if (event.keyCode === 13) {
    setCity(suggestedCities[0].name);
    setSuggestedCities([]);
  }

};
const handleCancelSearch = () => {
  setCity('');
  setSuggestedCities([]);
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
          <h2>{dayOfWeek}</h2>
          <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={description} />
          <p>{description}</p>
          <p>Temperature: {temperature}°F</p>
          <p>Feels like: {feelsLike}°F</p>
        </div>
      );
    });
  };

 return (
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
      <input type="text" placeholder="Enter city name to get the local weather i.e. Miami" value={city} onChange={handleCityChange} onKeyDown={handleCityChange} />
        { city.length > 0 && <button onClick={handleCancelSearch}>Cancel</button> }
      <button onClick={handleGetCurrentLocation}>Get Current Location</button>
    </div>
    <div className="forecast">{renderForecast()}</div>
        <div className="navigation">
            <Link to="/page1" className="button"style={{color: 'white'}}>Click here if you also want to get earthquake data near you</Link>
        </div>
        <div className="bottom-padding">
            <p>_</p>
        </div>
    </div>
);
}

export default Weather;