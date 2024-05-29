import { CityWeather } from '@/types';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { WeatherForecastService } from '@services/forecast/weather-forecast.service';
export const cityWeatherResolverResolver: ResolveFn<CityWeather> = (
  route,
  state // eslint-disable-line
) => {
  return inject(WeatherForecastService).getCityWeatherByString(
    route.paramMap.get('cityName') || '',
    route.paramMap.get('state') || '',
    route.paramMap.get('country') || ''
  );
};
