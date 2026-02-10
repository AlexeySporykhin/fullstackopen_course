import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import weatherService from "./services/weather";

const FilterField = ({ input, onChange }) => {
  return (
    <div>
      find countries <input value={input} onChange={onChange} />
    </div>
  );
};

const CountriesList = ({ countries, onShow }) => {
  return countries.map((country) => {
    return (
      <div key={country.name.common}>
        {country.name.common}
        <button type="button" onClick={() => onShow(country)}>
          Show
        </button>
      </div>
    );
  });
};

const CountryCard = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
      weatherService
        .getWeather(country.capital[0])
        .then((data) => setWeather(data));
  }, [country]);

  const capital = country.capital[0];
  console.log("country", country);
  console.log("weather", weather);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} />
      <h2>Weather in {capital}</h2>
      {weather && (
        <>
          <p>Temperature {(weather.main.temp - 273.15).toFixed(1)} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [initialCountries, setInitialCountries] = useState([]);
  const [country, setCountry] = useState(null);

  const handleInput = (event) => {
    setInputSearch(event.target.value);
    setCountry(null);
  };

  const handleShowCountry = (country) => {
    setCountry(country);
  };

  useEffect(() => {
    countriesService
      .getAll()
      .then((initialCountries) => setInitialCountries(initialCountries));
  }, []);

  const filteredCountries = initialCountries.filter((countryObj) => {
    const countryName = countryObj.name.common.toLowerCase();
    const substring = inputSearch.toLowerCase();
    return countryName.includes(substring);
  });

  return (
    <div>
      <FilterField input={inputSearch} onChange={handleInput} />
      {country ? (
        <CountryCard country={country} />
      ) : !inputSearch ? (
        <div></div>
      ) : filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filteredCountries.length > 1 ? (
        <CountriesList
          countries={filteredCountries}
          onShow={handleShowCountry}
        />
      ) : filteredCountries.length === 1 ? (
        <CountryCard country={filteredCountries[0]} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default App;
