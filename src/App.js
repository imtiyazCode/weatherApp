import './App.css';
import { useState } from 'react';
import { fetchWeather } from './api';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const weather = await fetchWeather(city, setError);
      setWeather(weather);
    } catch (error) {
      setError("City not found");
    }
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {error ? (
        <p className='error'>{error}</p>
      ) : (
        <div className="weather-card">
          <div className="card-header">
            <div>
              <p className="weather-city">{weather ? (weather.name + " " + weather.sys.country) : "-"}</p>
              <p className="weather-description">{weather ? (weather.weather[0].description) : "-"}</p>
            </div>
            <img alt={'weather'} className={'weather-icon'} src={`icons/${weather ? (weather.weather[0].icon) : "unknown"}.png`} />
          </div>
          <div className="card-body">
            <h2 className="weather-temp">{weather ? (weather.main?.temp - 273.15).toFixed(0) : ''}°C</h2>
            <div className="weather-details">
              <div className="parameters">
                <span className="param-label">Details</span>
              </div>
              <div className="parameters">
                <span className='param-label'>Feels Like:</span>
                <span className='param-val'> {weather ? (weather.main?.feels_like - 273.15).toFixed(2) : '-'} °C</span>
              </div>
              <div className="parameters">
                <span className='param-label'>Humidity: </span>
                <span className='param-val'> {weather ? (weather.main?.humidity) : '-'} %</span>
              </div>
              <div className="parameters">
                <span className='param-label'>Pressure: </span>
                <span className='param-val'> {weather ? (weather.main?.pressure) : '-'} hPs</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
