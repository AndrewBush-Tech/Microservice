import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backArrow from '../images/back-arrow.png';
import './backArrow.css';
import { API_KEY } from '../config';


function Page1() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [period, setPeriod] = useState('');
  const [result, setResult] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [selectedCity] = useState(null);

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
      setLatitude(weatherData.city.coord.lat)
      setLongitude(weatherData.city.coord.lon)
      console.log(weatherData.city.coord.lon)
      console.log(response.data);

    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `/quakes?time=${period}&lat=${Math.floor(weatherData.city.coord.lat)}&lon=${Math.floor(weatherData.city.coord.lon)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
    }
  };
    const handleBack = () => {
    navigate(-1);
  };
  
  console.log('State after submitting form:', { latitude, longitude, period, result });

  return (
    <div style={{ paddingTop: '50px', paddingBottom: '50px' }} className="page-container">
          <img
        src={backArrow}
        alt="back arrow"
        className="back-arrow"
        onClick={() => handleBack()}
      />
    <div className="weather">
      <h1>Earthquake Data</h1>
      <div className="location-input">
        { suggestedCities.length > 0 &&
          <ul className="suggestions2">
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
      <input type="text" placeholder="Enter city name to get earthquakes nearby i.e. Miami" value={city} onChange={handleCityChange} onKeyDown={handleCityChange} />
        { city.length > 0 && <button onClick={handleCancelSearch}>Cancel</button> }
      <button onClick={handleGetCurrentLocation}>Get Current Location</button>
    </div>
    <form onSubmit={handleSubmit}>
         <label>
        <input type="hidden" value={latitude} onChange={(event) => setLatitude(weatherData.city.coord.lat)} />
      </label>
      <label>
        <input type="hidden" value={longitude} onChange={(event) => setLongitude(weatherData.city.coord.lon)} />
      </label>
        <label>
          <input type="hidden" value={city} onChange={(event) => setCity(event.target.value)} />
        </label>
      <label>
        Period:
        <select value={period} onChange={(event) => setPeriod(event.target.value)}>
          <option value="h">Hour</option>
          <option value="d">Day</option>
          <option value="w">Week</option>
        </select>
      </label>
      <button type="submit">Submit</button>
      {result.count ? (
        <h2>
          Location: {result.location}, Magnitude: {result.magnitude}
        </h2>
      ) : null}
    </form>
    </div>
    </div>
  );
}

export default Page1;