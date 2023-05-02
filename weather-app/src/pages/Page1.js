import React, { useState } from 'react';

function Page1() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [period, setPeriod] = useState('');
  const [result, setResult] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `/quakes?time=${period}&lat=${parseInt(latitude)}&lon=${parseInt(longitude)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
    }
  };

  console.log('State after submitting form:', { latitude, longitude, period, result });

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Latitude:
        <input type="text" value={latitude} onChange={(event) => setLatitude(event.target.value)} />
      </label>
      <label>
        Longitude:
        <input type="text" value={longitude} onChange={(event) => setLongitude(event.target.value)} />
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
      <div>_</div>
      <div>_</div>
      <div>_</div>
    </form>
  );
}

export default Page1;
