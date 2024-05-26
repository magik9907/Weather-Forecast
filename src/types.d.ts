/**
 * imperial = Fahrenheit degree
 * kelvin = Kelvin degree
 * metric = Celsius degree
 */

export type TemperatureMetrics = 'imperial' | 'kelvin' | 'metric';
export type ENV = { production: boolean; api_key?: string; api_url: string };
export type WeatherIcon =
  | 'clear_night'
  | 'clear_day'
  | 'nights_stay'
  | 'partly_cloudy_day'
  | 'cloud'
  | 'cloud'
  | 'cloud'
  | 'cloud'
  | 'rainy'
  | 'rainy'
  | 'rainy'
  | 'rainy'
  | 'thunderstorm'
  | 'thunderstorm'
  | 'weather_snowy'
  | 'weather_snowy'
  | 'foggy'
  | 'foggy';

export interface City {
  name: string;
  state: string;
  lon: number;
  lat: number;
  country: string;
}

export interface SpecificWeatherForecast {
  date: string;
  hours: Omit<DayWeatherForecast, 'metric' | 'temperature_night'>[];
  metric: string;
}

export interface DayWeatherForecast {
  date: string;
  time: string;
  temperature_day: number;
  temperature_night: number;
  pressure: number;
  wind: number;
  weather: Weather;
  humidity: number;
  clouds: number;
  metric: string;
}

export type WeekWeatherForecast = Omit<DayWeatherForecast, 'time'>[];

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CityWeather {
  geolocation: City;
  week: WeekWeatherForecast;
  daily: SpecificWeatherForecast[];
}
