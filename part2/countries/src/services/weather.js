import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const api_key = import.meta.env.VITE_WEATHER_KEY;

const getWeather = (capital) => {
    const url = `${baseUrl}/?q=${capital}&units=metric&APPID=${api_key}`
    console.log('url', url);
    const request = axios.get(url);
    return request.then(response => response.data);
}

export default {getWeather};

