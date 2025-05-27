import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

async function getCoordsByCity(city: string): Promise<{ latitude: number; longitude: number }> {
  const response = await axios.get(GEO_URL, {
    params: { name: city, count: 1 },
  });

  if (!response.data.results || response.data.results.length === 0) {
    throw new Error('City not found');
  }

  const { latitude, longitude } = response.data.results[0];
  return { latitude, longitude };
}

async function getWeatherByCoords(latitude: number, longitude: number) {
  const params = {
    latitude,
    longitude,
    current: 'temperature_2m,weather_code,wind_speed_10m',
    hourly: 'temperature_2m',
    timezone: 'auto',
  };
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}

export async function getWeather(city: string, unit: 'metric' | 'imperial') {
  const { latitude, longitude } = await getCoordsByCity(city);

  const params = {
    latitude,
    longitude,
    current: 'temperature_2m,weather_code,wind_speed_10m',
    hourly: 'temperature_2m',
    timezone: 'auto',
  };

  const response = await axios.get(BASE_URL, { params });

  return {
    name: city,
    main: {
      temp: response.data.current.temperature_2m,
    },
    weather: [
      {
        description: `Code ${response.data.current.weather_code}`,
      },
    ],
    wind: {
      speed: response.data.current.wind_speed_10m,
    },
  };
}