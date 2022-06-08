import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${API_KEY}&units=metric`
      )
      .then(({ data }) => {
        setWeatherData(data);
      });
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      {weatherData && (
        <div>
          <p>temperature {weatherData.main.temp} Celsius</p>
          <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
          <p>wind {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
