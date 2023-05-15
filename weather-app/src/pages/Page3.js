import React from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from '../images/back-arrow.png';
import './backArrow.css';
import WeatherMap from './WeatherMap';

function RadarPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ paddingBottom: '120px' }}>
      <h1>Temperature Weather Map</h1>
      <WeatherMap />
      <img
        src={backArrow}
        alt="back arrow"
        className="back-arrow"
        onClick={() => handleBack()}
      />
    </div>
  );
}

export default RadarPage;
