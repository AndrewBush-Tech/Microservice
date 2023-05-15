import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backArrow from '../images/back-arrow.png';
import './backArrow.css';
import './week.css';
import { API_KEY } from '../config';

function Thursday() {
  const [forecastData, setForecastData] = useState(null);
  const navigate = useNavigate();
  const { city } = useParams();


  const handleBack = () => {
    navigate(-2);
  };

  useEffect(() => {
    console.log(city); // check if the city parameter is being updated correctly
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setForecastData(data);
      })
      .catch(error => {
        console.log('Error fetching forecast data:', error);
      });
  }, [city]);

  const convertTemperature = (temp) => {
    const fahrenheit = Math.round((temp - 273.15) * 9 / 5 + 32);
    const celsius = Math.round(temp - 273.15);
    return {
      fahrenheit,
      celsius
    };
  };

  return (
    <div style={{ paddingTop: '50px', paddingBottom: '50px' }} className="page-container">
      <h1>Thursday Hourly Forecast</h1>
      <img
        src={backArrow}
        alt="back arrow"
        className="back-arrow"
        onClick={() => handleBack()}
      />
      {forecastData && forecastData.list && forecastData.list.map(item => {
        const date = new Date(item.dt * 1000);
        if (date.getDay() === 1) { // filter for Thursday forecast only
          return (
            <div key={item.dt} className="week-container">
              <div>{date.toLocaleTimeString()}</div>
              <div>{item.weather[0].description}</div>
              <div>Feels like: {convertTemperature(item.main.feels_like).celsius}°C / {convertTemperature(item.main.feels_like).fahrenheit}°F</div>
              <div>Humidity: {item.main.humidity}</div>
              <div>Pressure: {item.main.pressure}</div>
              <div>Temperature: {convertTemperature(item.main.temp).celsius}°C / {convertTemperature(item.main.temp).fahrenheit}°F</div>
              <div>Temperature Max: {convertTemperature(item.main.temp_max).celsius}°C / {convertTemperature(item.main.temp_max).fahrenheit}°F</div>
              <div>Temperature Min: {convertTemperature(item.main.temp_min).celsius}°C / {convertTemperature(item.main.temp_min).fahrenheit}°F</div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default Thursday;
